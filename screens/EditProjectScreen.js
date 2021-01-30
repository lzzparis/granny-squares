import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { useFirebaseConnect } from 'react-redux-firebase';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { useRoute } from '@react-navigation/native';
import {
} from 'lodash';

import Button from '../components/Button';
import { colors, styles as themeStyles, gutter } from '../theme';

function EditProjectScreen() {
  const route = useRoute();
  const [name, setName] = useState(route.params.name || 'New Project');
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.listContainer}
      >
        <View style={styles.meta}>
          <Text style={themeStyles.h2}>Name</Text>
          <TextInput
            style={themeStyles.textInput}
            onChangeText={(text) => setName(text)}
            value={name}
          />
        </View>
      </ScrollView>
      <Button
        title="Save"
        onPress={() => {}}
        color={colors.accent1}
        accessibilityLabel="Save"
      />
    </SafeAreaView>
  );
}
const styles = {
  container: {
    width: '100%',
  },
  listContainer: {
    width: '100%',
    margin: 'auto',
    padding: gutter,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  meta: {
    ...themeStyles.section,
  },
};

export default (EditProjectScreen);
