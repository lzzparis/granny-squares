import React from 'react';
import { connect, useSelector } from 'react-redux';
import { useFirebaseConnect } from 'react-redux-firebase';
import {
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { get, map, sortBy } from 'lodash';

import GridItem from '../components/GridItem';
import Tracker from '../components/Tracker';
import { colors } from '../theme';
import { halfGutter } from '../utils';

function HomeScreen() {
  useFirebaseConnect('trackersMeta/examples');
  const examples = useSelector((state) => get(state, 'firebase.data.trackersMeta.examples', {}));
  console.log('examples', examples);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.listContainer}
      >
        {map(sortBy(examples, 'order'), (tracker, tid) => (
          <GridItem columns={3}>
            <Tracker
              key={`tracker-${tid}`}
              trackerId={tid}
              {...tracker}
            />
          </GridItem>
        ))}
        <GridItem columns={3}>
          <Icon
            color={colors.accent1}
            name="plus"
            onPress={console.log('Pressed add')}
            raised
            reverse
            size={32}
            type="font-awesome-5"
          />
        </GridItem>
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

export default (HomeScreen);
