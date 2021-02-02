// name
// button for edit screen
// button for colors? (new screen?)
//

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useFirebaseConnect } from 'react-redux-firebase';
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
} from 'lodash';

import Button from '../components/Button';
import ColorBlob from '../components/ColorBlob';
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
  const colorSetSize = size(colorSet);
  if (colorSetSize === 0) {
    return fill(new Array(length), { name: 'white', hex: '#FFFFFF' });
  } if (colorSetSize < length) {
    return getRandomSubset(colorSet, colorSetSize);
  }
  return getRandomSubset(colorSet, length);
}

function ProjectScreen() {
  const route = useRoute();
  const { projectId } = route.params;

  useFirebaseConnect(`projects/${uid}`);
  const project = useSelector((state) => get(state, `firebase.data.projects.${uid}.${projectId}`, {}));
  const { tiers = 3, colors: projectColors } = project;

  const starterColors = randomizeColors(projectColors, tiers);
  const [colors, setColors] = useState(starterColors);

  return (
    <SafeAreaView style={themeStyles.screenContainer}>
      <ScrollView
        contentContainerStyle={styles.listContainer}
        style={{ width: '100%' }}
      >
        <View style={styles.colors}>
          <Text style={themeStyles.h2}>Colors</Text>
          <View style={styles.blobsGroup}>
            {map(colors, ({ name, hex }) => (
              <GridItem columns={size(colors)} withPadding>
                <ColorBlob name={name} hex={hex} />
              </GridItem>
            ))}
          </View>
        </View>
        <GrannySquare colors={reverse(colors)} />
      </ScrollView>
      <Button
        title="Randomize"
        onPress={() => setColors(randomizeColors(projectColors, tiers))}
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
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
};

export default (ProjectScreen);
