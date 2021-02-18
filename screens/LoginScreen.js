import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  useFirebase, isLoaded, isEmpty,
} from 'react-redux-firebase';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  // TextInput,
} from 'react-native';

import Button from '../components/Button';
import TextInput from '../components/TextInput';

import { colors as themeColors, styles as themeStyles } from '../theme';

function LoginScreen(children) {
  const firebase = useFirebase();
  const auth = useSelector((state) => state.firebase.auth);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const authInfo = {
    auth,
    isLoaded: isLoaded(auth),
    isEmpty: isEmpty(auth),
  };

  const loginUser = (e) => {
    e.preventDefault();
    firebase.login({ email, password });
  };
  const registerUser = (e) => {
    e.preventDefault();
    firebase.createUser({ email, password }, { email });
  };

  return (
    <SafeAreaView style={{ ...themeStyles.screenContainer, backgroundColor: themeColors.primary }}>
      <ScrollView
        style={{
          width: '100%',
        }}
        contentContainerStyle={themeStyles.scrollContainer}
      >
        <View style={styles.centerOnPage}>
          <Text style={themeStyles.h1}>Welcome!</Text>
          <View style={themeStyles.card}>
            <TextInput
              label="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              autoCapitalize="none"
            />
            <TextInput
              label="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
              addMargin
            />
          </View>
          <View style={styles.buttonGroup}>
            <Button title="Login" onPress={loginUser} fullWidth />
            <Button title="Register" onPress={registerUser} fullWidth addMargin />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = {
  centerOnPage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonGroup: {
    width: '100%',
    flexDirection: 'row',
  },
};

export default (LoginScreen);
