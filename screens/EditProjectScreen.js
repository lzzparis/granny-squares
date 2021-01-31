import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import {
} from 'lodash';

import Button from '../components/Button';
import { colors, styles as themeStyles, gutter } from '../theme';

function EditProjectScreen() {
  const route = useRoute();
  const [name, setName] = useState(route.params.name || 'New Project');
  const [tiers, setTiers] = useState(route.params.tiers || 4);
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
          <Text style={themeStyles.h2}>Tiers</Text>
          <TextInput
            style={themeStyles.textInput}
            onChangeText={(text) => setTiers(+text)}
            value={tiers}
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
    ...themeStyles.card,
  },
};

export default EditProjectScreen;
