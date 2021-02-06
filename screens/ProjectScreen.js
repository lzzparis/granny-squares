// name
// button for edit screen
// button for colors? (new screen?)
//

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFirebase, useFirebaseConnect } from 'react-redux-firebase';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import {
  concat,
  fill,
  get,
  map,
  reverse,
  size,
  values,
  sample,
} from 'lodash';

import Button from '../components/Button';
import ColorBlob from '../components/ColorBlob';
import ColorEditor from '../components/ColorEditor';
import GrannySquare from '../components/GrannySquare';
import GridItem from '../components/GridItem';

import { uid } from '../constants';
import {
  colors as themeColors, styles as themeStyles,
} from '../theme';

function getRandomSubset(set, size) {
  const arr = values(set);
  const shuffled = arr.slice(0);
  let i = arr.length;
  const min = i - size;
  let temp; let
    index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
}

function randomizeColors(colorSet, length) {
  const colorSetWithIds = map(colorSet, (color, colorId) => ({ ...color, colorId }));
  const colorSetSize = size(colorSetWithIds);
  if (colorSetSize === 0) {
    return fill(new Array(length), { name: 'white', hex: '#FFFFFF' });
  } if (colorSetSize < length) {
    return getRandomSubset(colorSetWithIds, colorSetSize);
  }
  return getRandomSubset(colorSetWithIds, length);
}

function ProjectScreen() {
  const route = useRoute();
  const { projectId } = route.params;

  const firebase = useFirebase();
  useFirebaseConnect(`projects/${uid}`);
  const project = useSelector((state) => get(state, `firebase.data.projects.${uid}.${projectId}`, {}));
  const { tiers = 3, colors: projectColors } = project;

  const starterColors = randomizeColors(projectColors, tiers);
  const [colors, setColors] = useState(starterColors);
  const [colorToEditId, setColorToEditId] = useState(null);

  const openColorEditor = (color) => {
    setColorToEditId(get(color, 'colorId', null));
  };

  function saveSquare(e) {
    e.preventDefault();
    firebase.push(`projects/${uid}/${projectId}/saved`, colors);
  }

  const saveColor = (colorToSave, index) => () => {
    const newColors = [...colors];
    newColors[index] = colorToSave;
    setColors(newColors);
    setColorToEditId(null);
  };
  const cancelColorEdit = () => {
    setColorToEditId(null);
  };

  useEffect(() => {
    console.log('lzz colors changed', colors);
  });

  return (
    <SafeAreaView style={themeStyles.screenContainer}>
      <ScrollView
        contentContainerStyle={styles.listContainer}
        style={{ width: '100%' }}
      >
        <View style={styles.colors}>
          <Text style={themeStyles.h2}>Colors</Text>
          <View style={styles.blobsGroup}>
            {map(colors, ({ name, hex, colorId }, colorBlobIdx) => (
              <GridItem
                key={`color-blob-${colorBlobIdx}`}
                columns={size(colors)}
                withPadding
              >
                <ColorBlob
                  colorId={colorId}
                  name={name}
                  hex={hex}
                  onPress={openColorEditor}
                />
              </GridItem>
            ))}
          </View>
        </View>
        <GrannySquare colors={colors} />
      </ScrollView>
      <View style={styles.buttonsGroup}>
        <Button
          title="Save"
          onPress={saveSquare}
        />
        <Button
          title="Randomize"
          onPress={() => setColors(randomizeColors(projectColors, tiers))}
        />
      </View>
      <ColorEditor
        projectColors={projectColors}
        colorToEditId={colorToEditId}
        onSaveColor={saveColor}
        onCancel={cancelColorEdit}
      />
    </SafeAreaView>
  );
}
const styles = {
  listContainer: {},
  colors: {
    ...themeStyles.card,
  },
  blobsGroup: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
  },
  buttonsGroup: {
    flexDirection: 'row',
  },
};

export default (ProjectScreen);
