import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import {
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import {
  get,
} from 'lodash';

import Button from '../components/Button';
import FeedbackModal from '../components/FeedbackModal';
import InfoSubheader from '../components/InfoSubheader';
import TextInput from '../components/TextInput';

import { styles as themeStyles } from '../theme';

function AccountScreen() {
  // Hooks
  const firebase = useFirebase();
  const uid = useSelector((state) => get(state, 'firebase.auth.uid'));
  const {
    displayName: savedName,
  } = useSelector((state) => get(state, 'firebase.profile'));

  // State hooks
  const [displayName, setDisplayName] = useState(savedName);
  const [feedback, setFeedback] = useState({});
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const unsavedChanges = displayName !== savedName;

  // Button functions
  const saveData = async (e) => {
    e.preventDefault();
    if (uid) {
      await firebase.update(`users/${uid}`, { displayName })
        .catch((err) => {
          setFeedback({ type: 'error', message: 'Error saving account' });
          console.error('Error saving account:', err.message);
          setFeedbackOpen(true);
        });

      setTimeout(() => setFeedbackOpen(false), 1000);
    }
  };

  const logoutUser = (e) => {
    e.preventDefault();
    firebase.logout();
  };

  return (
    <SafeAreaView style={themeStyles.screenContainer}>
      {unsavedChanges && <InfoSubheader>Account has unsaved changes</InfoSubheader>}
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
      <FeedbackModal open={feedbackOpen} type={feedback.type} message={feedback.message} />
    </SafeAreaView>
  );
}

export default (AccountScreen);
