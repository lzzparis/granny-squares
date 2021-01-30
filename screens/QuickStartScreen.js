// dropdown for tiers
// input circles
//

import React from 'react';
import { connect, useSelector } from 'react-redux';
import { useFirebaseConnect } from 'react-redux-firebase';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import {
  get, map, sortBy, size,
} from 'lodash';

import ProjectListItem from '../components/ProjectListItem';
import { colors } from '../theme';
import { halfGutter } from '../utils';

function QuickStartScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.listContainer}
      >
        <Text>You've reached the QuickStartScreen</Text>
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

export default (QuickStartScreen);
