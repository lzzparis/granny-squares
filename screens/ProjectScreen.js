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
import IconButton from '../components/IconButton';

import { uid } from '../constants';
import { colors as themeColors, styles as themeStyles, halfGutter } from '../theme';

function ProjectScreen() {
  const route = useRoute();
  const { projectId } = route.params;

  useFirebaseConnect(`projects/${uid}`);
  const project = useSelector((state) => get(state, `firebase.data.projects.${uid}.${projectId}`, {}));
  const { tiers, colors: projectColors } = project;
  const starterColors = fill(new Array(tiers), { name: 'white', hex: '#FFFFFF' });
  const [colors, setColors] = useState(starterColors);

  return (
    <SafeAreaView style={themeStyles.screenContainer}>
      <ScrollView
        contentContainerStyle={styles.listContainer}
        style={{ width: '100%' }}
      >
        <View style={styles.colorBlobs}>
          <Text style={themeStyles.h2}>Colors</Text>
          {map(colors, (color, colorId) => (
            <GridItem columns={size(colors)}>
              <ColorBlob />
            </GridItem>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = {
  listContainer: {},
  colorBlobs: {
    ...themeStyles.card,
  },
};

export default (ProjectScreen);
