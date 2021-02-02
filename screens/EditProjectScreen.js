import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import {
  get,
} from 'lodash';

import Button from '../components/Button';
import Modal from '../components/Modal';
import { colors, styles as themeStyles, gutter } from '../theme';
import { uid } from '../constants';

function EditProjectScreen() {
  const route = useRoute();
  const { projectId } = route.params;
  const project = useSelector((state) => get(state, `firebase.data.projects.${uid}.${projectId}`, {}));
  const { name: savedName, tiers: savedTiers } = project;
  const [name, setName] = useState(savedName || 'New Project');
  const [tiers, setTiers] = useState(savedTiers || 4);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <SafeAreaView style={themeStyles.screenContainer}>
      <ScrollView
        contentContainerStyle={styles.listContainer}
        style={{ width: '100%' }}
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
        onPress={() => setModalOpen(true)}
        accessibilityLabel="Save"
      />
      <Modal
        title="Edit Color"
        visible={modalOpen}
        onRequestClose={() => setModalOpen(false)}
      >
        <Text>boop</Text>
      </Modal>

    </SafeAreaView>
  );
}
const styles = {
  listContainer: {},
  meta: {
    ...themeStyles.card,
  },
};

export default EditProjectScreen;
