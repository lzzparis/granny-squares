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
  fill, get, map, size,
} from 'lodash';

import GridItem from '../components/GridItem';
import ColorBlob from '../components/ColorBlob';
import GrannySquare from '../components/GrannySquare';

import { uid } from '../constants';
import {
  colors as themeColors, styles as themeStyles,
} from '../theme';

function ProjectScreen() {
  const route = useRoute();
  const { projectId } = route.params;

  useFirebaseConnect(`projects/${uid}`);
  const project = useSelector((state) => get(state, `firebase.data.projects.${uid}.${projectId}`, {}));
  const { tiers = 3, colors: projectColors } = project;
  const starterColors = fill(new Array(tiers), { name: 'white', hex: '#FFFFFF' });
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
              <GridItem columns={size(colors)}>
                <ColorBlob name={name} hex={hex} />
              </GridItem>
            ))}
          </View>
        </View>
        <GrannySquare />
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
