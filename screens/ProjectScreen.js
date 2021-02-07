// name
// button for edit screen
// button for colors? (new screen?)
//

import React, { useState } from 'react';
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
  fill,
  get,
  keys,
  map,
  size,
  values,
  sample,
  remove,
} from 'lodash';

import Button from '../components/Button';
import ColorBlob from '../components/ColorBlob';
import ColorEditor from '../components/ColorEditor';
import GrannySquare from '../components/GrannySquare';
import GridItem from '../components/GridItem';

import { uid } from '../constants';
import {
  styles as themeStyles,
} from '../theme';

// function getRandomSubset(set, subsetSize) {
//   const arr = values(set);
//   const shuffled = arr.slice(0);
//   let i = arr.length;
//   const min = i - subsetSize;
//   let temp; let
//     index;
//   while (i > min) {
//     i -= 1;
//     index = Math.floor((i + 1) * Math.random());
//     temp = shuffled[index];
//     shuffled[index] = shuffled[i];
//     shuffled[i] = temp;
//   }
//   return shuffled.slice(min);
// }

// function randomizeColors(colorSet, length) {
//   const colorSetIds = keys(colorSet);
//   const colorSetSize = size(colorSetIds);
//   if (colorSetSize === 0) {
//     return fill(new Array(length), { name: 'white', hex: '#FFFFFF' });
//   } if (colorSetSize < length) {
//     return getRandomSubset(colorSetIds, colorSetSize);
//   }
//   return getRandomSubset(colorSetIds, length);
// }

const randomizeColors = ({
  tiers, projectColors, workingColorIds, isLocked,
}) => {
  const colorOptions = keys(projectColors);
  const newWorkingColorIds = new Array(tiers);
  for (let i = 0; i < tiers; i++) {
    if (workingColorIds && isLocked[i]) {
      newWorkingColorIds[i] = workingColorIds[i];
    } else {
      newWorkingColorIds[i] = sample(colorOptions);
    }
    remove(colorOptions, newWorkingColorIds[i]);
  }
  return newWorkingColorIds;
};

function ProjectScreen() {
  const route = useRoute();
  const { projectId } = route.params;

  const firebase = useFirebase();
  useFirebaseConnect(`projects/${uid}`);
  const project = useSelector((state) => get(state, `firebase.data.projects.${uid}.${projectId}`, {}));
  const { tiers = 3, colors: projectColors } = project;

  const starterColors = randomizeColors({ projectColors, tiers });
  const [workingColorIds, setWorkingColorIds] = useState(starterColors);
  const [colorToEditId, setColorToEditId] = useState(null);
  const [colorToEditIndex, setColorToEditIndex] = useState(null);
  const [isLocked, setIsLocked] = useState(new Array(tiers));

  // Database functions
  const saveSquare = (e) => {
    e.preventDefault();
    firebase.push(`projects/${uid}/${projectId}/saved`, workingColorIds);
  };

  // Randomizing functions
  const toggleLockColor = (index) => () => {
    const newIsLocked = [...isLocked];
    newIsLocked[index] = !newIsLocked[index];
    setIsLocked(newIsLocked);
  };

  // ColorEditor functions
  const openColorEditor = (colorId, colorIndex) => () => {
    setColorToEditId(colorId);
    setColorToEditIndex(colorIndex);
  };

  const saveColor = (colorToSave, index) => () => {
    const newColors = [...workingColorIds];
    newColors[index] = colorToSave;
    setWorkingColorIds(newColors);
    setColorToEditId(null);
  };

  const cancelColorEdit = () => {
    setColorToEditId(null);
  };

  return (
    <SafeAreaView style={themeStyles.screenContainer}>
      <ScrollView
        contentContainerStyle={styles.listContainer}
        style={{ width: '100%' }}
      >
        <View style={styles.colorBlobs}>
          <Text style={themeStyles.h2}>Colors</Text>
          <View style={styles.blobsGroup}>
            {map(workingColorIds, (colorId, colorBlobIndex) => (
              <GridItem
                key={`color-blob-${colorBlobIndex}`}
                columns={size(workingColorIds)}
                withPadding
              >
                <ColorBlob
                  name={projectColors[colorId].name}
                  hex={projectColors[colorId].hex}
                  onPress={openColorEditor(colorId, colorBlobIndex)}
                  onLongPress={toggleLockColor(colorBlobIndex)}
                  locked={isLocked[colorBlobIndex]}
                />
              </GridItem>
            ))}
          </View>
        </View>
        <GrannySquare projectColors={projectColors} colorIds={workingColorIds} />
      </ScrollView>
      <View style={styles.buttonsGroup}>
        <Button
          title="Save"
          onPress={saveSquare}
        />
        <Button
          title="Randomize"
          onPress={() => setWorkingColorIds(randomizeColors({
            workingColorIds, isLocked, projectColors, tiers,
          }))}
        />
      </View>
      <ColorEditor
        projectColors={projectColors}
        colorToEditId={colorToEditId}
        onSaveColor={saveColor}
        onCancel={cancelColorEdit}
        colorToEditIndex={colorToEditIndex}
      />
    </SafeAreaView>
  );
}
const styles = {
  listContainer: {},
  colorBlobs: {
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
