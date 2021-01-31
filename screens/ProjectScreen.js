// name
// button for edit screen
// button for colors? (new screen?)
//

import React from 'react';
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
  get, map, take, size,
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
  const { tiers, colors: dbColors } = project;

  const colors = take(dbColors, tiers);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.listContainer}
      >
        <View style={styles.colorBlobs}>
          <Text style={themeStyles.h2}>Colors</Text>
          {map(colors, (color, colorId) => (
            <GridItem columns={size(colors)}>
              <ColorBlob />
            </GridItem>
          ))}
          <IconButton
            name="plus"
            level="1"
            size="medium"
            onPress={() => console.log('Pressed')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = {
  container: {},
  listContainer: {
    width: '100%',
    margin: 'auto',
    padding: halfGutter,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
};

export default (ProjectScreen);
