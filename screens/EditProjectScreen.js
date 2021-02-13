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
} from 'lodash';

import Button from '../components/Button';
import ColorBlob from '../components/ColorBlob';
import ColorPicker from '../components/ColorPicker';
import GridItem from '../components/GridItem';
import TextInput from '../components/TextInput';

import { styles as themeStyles } from '../theme';
import { uid } from '../constants';

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

  const openColorPicker = (colorId) => () => {
    console.log('lzz opening', colorId, projectColors[colorId], colorToEditId);
    setColorToEditId(colorId);
    console.log('lzz post setColorToEditId', { colorToEditId });
    setColorPickerOpen(true);
    console.log('lzz post setColorPickerOpen', { colorPickerOpen });
  };
  const saveColors = ({ colorId, ...newColor }) => () => {
    console.log('lzz enter savecolors', { colorToEditId });
    const newProjectColors = cloneDeep(projectColors);
    newProjectColors[colorId] = newColor;
    console.log('lzz before setProjectColors', { colorToEditId, colorPickerOpen });
    setProjectColors(newProjectColors);
    console.log('lzz before setColorPickerOpen', { colorToEditId, colorPickerOpen });
    setColorPickerOpen(false);
    console.log('lzz after setColorPickerOpen', { colorToEditId, colorPickerOpen });
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
                />
                <Text style={{ elevation: 2, marginTop: -32 }}>{projectColorId}</Text>
              </GridItem>
            ))}
          </View>
        </View>
      </ScrollView>
      <Button
        title="Save"
        onPress={
          () => {}
        }
        accessibilityLabel="Save"
      />
      <ColorPicker
        visible={colorPickerOpen}
        colorId={colorToEditId}
        name={get(projectColors, `${colorToEditId}.name`, '-NAME-')}
        hex={get(projectColors, `${colorToEditId}.hex`, '#a1beef')}
        onSaveColor={saveColors}
        onCancel={() => setColorToEditId(null)}
      />
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
