import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import {
  get,
  map,
} from 'lodash';

import Button from '../components/Button';
import ColorBlob from '../components/ColorBlob';
import GridItem from '../components/GridItem';

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
  const [colorToEdit, setColorToEdit] = useState();

  const saveColors = (newColor) => {
    const newProjectColors = [...projectColors];
    newProjectColors[newColor.colorId] = newColor;
    setProjectColors(newProjectColors);
  };

  return (
    <SafeAreaView style={themeStyles.screenContainer}>
      <ScrollView
        style={{ width: '100%' }}
        contentContainerStyle={themeStyles.scrollContainer}
      >
        <View style={themeStyles.card}>
          <Text style={themeStyles.h2}>Name</Text>
          <TextInput
            style={themeStyles.textInput}
            onChangeText={(text) => setName(text)}
            value={name}
          />
          <Text style={themeStyles.h2}>Tiers</Text>
          <TextInput
            style={themeStyles.textInput}
            onChangeText={(text) => setTiers(+text)}
            value={tiers}
          />
        </View>
        <View style={themeStyles.card}>
          <Text style={themeStyles.h2}>Colors</Text>
          <View style={styles.blobs}>
            {map(projectColors, ({ name, hex }, projectColorId) => (
              <GridItem
                key={`color-blob-${projectColorId}`}
                columns={4}
                withPadding
              >
                <ColorBlob
                  name={name}
                  hex={hex}
                  onPress={() => console.log('Blob', projectColorId)}
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
          () => setColorToEdit({ name: 'pink', hex: 'pink', colorId: 'pink' })
        }
        accessibilityLabel="Save"
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
