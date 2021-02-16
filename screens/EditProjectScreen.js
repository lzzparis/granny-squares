import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import {
  cloneDeep,
  get,
  map,
  omit,
  sample,
} from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import Button from '../components/Button';
import ColorBlob from '../components/ColorBlob';
import ColorPicker from '../components/ColorPicker';
import GridItem from '../components/GridItem';
import IconButton from '../components/IconButton';
import Modal from '../components/Modal';
import TextInput from '../components/TextInput';

import { colors as themeColors, styles as themeStyles } from '../theme';
import { uid, grannySquareColors } from '../constants';

function EditProjectScreen() {
  const route = useRoute();
  const { projectId } = route.params;
  const project = useSelector((state) => get(state, `firebase.data.projects.${uid}.${projectId}`, {}));
  const {
    name: savedName,
    tiers: savedTiers,
    colors: savedColors,
  } = project;
  const [name, setName] = useState(savedName || 'New Project');
  const [tiers, setTiers] = useState(savedTiers || 4);
  const [projectColors, setProjectColors] = useState(savedColors);
  const [colorToEditId, setColorToEditId] = useState();
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  // Modal functions
  const openColorPicker = (colorId) => () => {
    setColorToEditId(colorId);
    setColorPickerOpen(true);
  };

  const openDeleteConfirm = (colorId) => () => {
    setColorToEditId(colorId);
    setDeleteConfirmOpen(true);
  };

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
          <TextInput
            label="Tiers"
            onChangeText={(text) => setTiers(+text)}
            value={tiers}
          />
        </View>
        <View style={themeStyles.card}>
          <Text style={themeStyles.h2}>Colors</Text>
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
      <View styles={themeStyles.footer}>
        <Button
          title="Save"
          onPress={
          () => {}
        }
          accessibilityLabel="Save"
        />
      </View>
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
