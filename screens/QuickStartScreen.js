// dropdown for tiers
// input circles
//

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native';

import { halfGutter, styles as themeStyles } from '../theme';

function QuickStartScreen() {
  return (
    <SafeAreaView style={themeStyles.screenContainer}>
      <ScrollView
        contentContainerStyle={styles.listContainer}
        style={{ width: '100%' }}
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
