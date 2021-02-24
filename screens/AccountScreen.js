import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import {
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  get, map, size,
} from 'lodash';

import Button from '../components/Button';
import TextInput from '../components/TextInput';

import { gutter, styles as themeStyles } from '../theme';

function AccountScreen() {
  const firebase = useFirebase();
  const uid = useSelector((state) => get(state, 'firebase.auth.uid'));
  const {
    displayName: savedName,
  } = useSelector((state) => get(state, 'firebase.profile'));

  const [displayName, setDisplayName] = useState(savedName);

  // Button functions
  const saveData = (e) => {
    e.preventDefault();
    if (uid) {
      firebase.update(`users/${uid}`, { displayName });
    }
  };

  const logoutUser = (e) => {
    e.preventDefault();
    firebase.logout();
  };

  return (
    <SafeAreaView style={themeStyles.screenContainer}>
      <ScrollView
        contentContainerStyle={themeStyles.scrollContainer}
        style={{ width: '100%' }}
      >
        <View style={themeStyles.card}>
          <TextInput label="Display Name" value={displayName} onChangeText={(text) => setDisplayName(text)} />

        </View>
        <Button onPress={logoutUser} title="Logout" level="4" />
      </ScrollView>
      <View style={themeStyles.footer}>
        <Button
          onPress={saveData}
          title="Save"
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
}

const styles = {};

export default (AccountScreen);
