import React from 'react';
import { useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  get, map, size,
} from 'lodash';

import Button from '../components/Button';
import { gutter, styles as themeStyles } from '../theme';

function AccountScreen() {
  const firebase = useFirebase();
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
        <Button onPress={logoutUser} title="Logout" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = {};

export default (AccountScreen);
