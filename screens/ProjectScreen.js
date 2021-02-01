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

import GridItem from '../components/GridItem';
import ColorBlob from '../components/ColorBlob';
import GrannySquare from '../components/GrannySquare';

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

function ProjectScreen() {
  const route = useRoute();
  const { projectId } = route.params;

  useFirebaseConnect(`projects/${uid}`);
  const project = useSelector((state) => get(state, `firebase.data.projects.${uid}.${projectId}`, {}));
  const { tiers = 3, colors: projectColors } = project;
  const numProjectColors = size(projectColors);
  let starterColors = [];
  if (numProjectColors < tiers) {
    const fillerColors = fill(new Array(tiers), { name: 'white', hex: '#FFFFFF' });
    starterColors = concat(getRandomSubset(projectColors, numProjectColors), fillerColors);
  } else {
    starterColors = getRandomSubset(projectColors, tiers);
  }
  const [colors, setColors] = useState(starterColors);
  console.log('lzz', colors);

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
              <GridItem columns={size(colors)}>
                <ColorBlob name={name} hex={hex} />
              </GridItem>
            ))}
          </View>
        </View>
        <GrannySquare colors={reverse(colors)} />
      </ScrollView>
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
