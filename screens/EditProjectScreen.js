import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useFirebase } from 'react-redux-firebase';
import {
  cloneDeep,
  get,
  keys,
  map,
  omit,
  sample,
  size,
} from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import Button from '../components/Button';
import ColorBlob from '../components/ColorBlob';
import ColorPicker from '../components/ColorPicker';
import Dropdown from '../components/Dropdown';
import FeedbackModal from '../components/FeedbackModal';
import GridItem from '../components/GridItem';
import IconButton from '../components/IconButton';
import InfoSubheader from '../components/InfoSubheader';
import Modal from '../components/Modal';
import TextInput from '../components/TextInput';

import { colors as themeColors, styles as themeStyles } from '../theme';
import { availableTiers, grannySquareColors } from '../constants';

function EditProjectScreen() {
  const route = useRoute();
  const { projectId } = route.params;
  const uid = useSelector((state) => get(state, 'firebase.auth.uid'));
  const project = useSelector((state) => get(state, `firebase.data.projects.${uid}.${projectId}`, {}));
  const {
    name: savedName,
    tiers: savedTiers,
    colors: savedProjectColors,
  } = project;

  // State hooks
  const [name, setName] = useState(savedName || 'New Project');
  const [tiers, setTiers] = useState(`${savedTiers || 3}`);
  const [projectColors, setProjectColors] = useState(savedProjectColors || {});
  const [projectColorsHaveChanged, setProjectColorsHaveChanged] = useState(false);
  const [colorToEditId, setColorToEditId] = useState();
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedback, setFeedback] = useState({});

  // Detect if project colors have changed since last save
  useEffect(() => {
    const numProjectColors = size(projectColors);
    const numSavedProjectColors = size(savedProjectColors);
    if (numProjectColors !== numSavedProjectColors) {
      setProjectColorsHaveChanged(true);
      return;
    }
    let compareFailed = false;
    const projectColorsKeys = keys(projectColors);
    for (let i = 0; i < numProjectColors; i++) {
      const key = projectColorsKeys[i];
      const { name: savedColorName, hex: savedColorHex } = get(savedProjectColors, key, {});
      const { name: projectColorName, hex: projectColorHex } = get(projectColors, key, {});
      if (savedColorName !== projectColorName || savedColorHex !== projectColorHex) {
        compareFailed = true;
        break;
      }
    }
    setProjectColorsHaveChanged(compareFailed);
  }, [projectColors]);

  const unsavedChanges = projectColorsHaveChanged
    || (name !== savedName)
    || (+tiers !== +savedTiers);

  // Database functions
  const firebase = useFirebase();
  const saveDataToDb = async (e) => {
    e.preventDefault();
    const dataToSave = {
      name,
      tiers,
      colors: projectColors,
    };
    const firebaseAction = projectId ? firebase.update : firebase.push;
    const firebasePath = projectId ? `projects/${uid}/${projectId}` : `projects/${uid}`;
    await firebaseAction(firebasePath, dataToSave)
      .then(() => {
        setProjectColorsHaveChanged(false);
      })
      .catch((err) => {
        setFeedback({ type: 'error', message: 'Error saving project' });
        console.error('Error saving project:', err.message);
        setFeedbackOpen(true);
      });

    setTimeout(() => setFeedbackOpen(false), 1000);
  };

  // Modal functions
  const openColorPicker = (colorId) => () => {
    setColorToEditId(colorId);
    setColorPickerOpen(true);
  };

  const openDeleteConfirm = (colorId) => () => {
    setColorToEditId(colorId);
    setDeleteConfirmOpen(true);
  };

  // Project color update functions
  const saveColors = ({ colorId, ...newColor }) => () => {
    const newProjectColors = cloneDeep(projectColors);
    newProjectColors[colorId] = newColor;
    setProjectColors(newProjectColors);
    setColorPickerOpen(false);
  };

  const addNewColor = () => {
    const newProjectColors = cloneDeep(projectColors);
    const uuid = uuidv4();
    newProjectColors[uuid] = sample(grannySquareColors);
    setProjectColors(newProjectColors);
    openColorPicker(uuid)();
  };

  const deleteColor = () => {
    const newProjectColors = cloneDeep(projectColors);
    setProjectColors(omit(newProjectColors, colorToEditId));
    setDeleteConfirmOpen(false);
  };

  return (
    <SafeAreaView style={themeStyles.screenContainer}>
      {unsavedChanges && <InfoSubheader>Project has unsavedChanges</InfoSubheader>}
      <ScrollView
        style={{ width: '100%' }}
        contentContainerStyle={themeStyles.scrollContainer}
      >
        <View style={themeStyles.card}>
          <TextInput
            label="Name"
            onChangeText={(text) => setName(text)}
            value={name}
          />
          <Dropdown
            label="Tiers"
            options={availableTiers}
            onValueChange={(text) => setTiers(text)}
            value={tiers}
            addMargin
          />
        </View>
        <View style={themeStyles.card}>
          <Text style={themeStyles.h2}>Colors</Text>
          {size(projectColors) !== +tiers
            && <Text style={themeStyles.info}>{`Add at least ${tiers} colors to save the project`}</Text>}
          <View style={styles.blobs}>
            {map(projectColors, ({ name: colorName, hex }, projectColorId) => (
              <GridItem
                key={`color-blob-${projectColorId}`}
                columns={4}
                withPadding
              >
                <ColorBlob
                  name={colorName}
                  hex={hex}
                  onPress={openColorPicker(projectColorId)}
                  onLongPress={openDeleteConfirm(projectColorId)}
                />
              </GridItem>
            ))}
            <GridItem
              key="add-color-button"
              columns={4}
              withPadding
            >
              <IconButton
                size="small"
                name="plus"
                level={2}
                onPress={addNewColor}
              />
            </GridItem>
          </View>
        </View>
      </ScrollView>
      <ColorPicker
        visible={colorPickerOpen}
        colorId={colorToEditId}
        name={get(projectColors, `${colorToEditId}.name`, '-NAME-')}
        hex={get(projectColors, `${colorToEditId}.hex`, '#a1beef')}
        onSaveColor={saveColors}
        onCancel={() => setColorPickerOpen(false)}
      />
      <Modal
        title="Delete color?"
        headerColor={themeColors.error}
        visible={deleteConfirmOpen}
        onConfirm={deleteColor}
        confirmLabel="Confirm"
        onRequestClose={() => setDeleteConfirmOpen(false)}
        isDestructive
        showCancel
      >
        <Text style={themeStyles.h2}>
          {`Are you sure you want to delete ${get(projectColors, `${colorToEditId}.name`)}?`}
        </Text>
      </Modal>
      <View style={themeStyles.footer}>
        <Button
          title="Save"
          onPress={saveDataToDb}
          accessibilityLabel="Save"
          fullWidth
          disabled={size(projectColors) !== +tiers}
        />
      </View>
      <FeedbackModal open={feedbackOpen} type={feedback.type} message={feedback.message} />
    </SafeAreaView>
  );
}
const styles = {
  blobs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
};

export default EditProjectScreen;
