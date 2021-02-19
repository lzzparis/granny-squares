import React, { useState } from 'react';
import {
  useFirebase,
} from 'react-redux-firebase';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';

import Button from '../components/Button';
import TextInput from '../components/TextInput';

import { halfGutter, colors as themeColors, styles as themeStyles } from '../theme';

function LoginScreen() {
  const firebase = useFirebase();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [authError, setAuthError] = useState(false);

  const loginUser = (e) => {
    e.preventDefault();
    firebase.login({ email, password })
      .then((res) => res)
      .catch((err) => setAuthError(err));
  };
  const registerUser = (e) => {
    e.preventDefault();
    firebase.createUser({ email, password }, { email })
      .then((res) => res)
      .catch((err) => setAuthError(err));
  };

  const disableButtons = !email || !password;

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
            { authError
              && (
              <View style={styles.textWrapper}>
                <Text style={themeStyles.error}>
                  Error logging in; please check your credentials
                </Text>
              </View>
              )}
          </View>
          <View style={styles.buttonGroup}>
            <Button
              title="Login"
              onPress={loginUser}
              fullWidth
              disabled={disableButtons}
            />
            <Button
              title="Register"
              onPress={registerUser}
              fullWidth
              addMargin
              disabled={disableButtons}
            />
          </View>
          <View style={styles.textWrapper}>
            <Text style={themeStyles.link}>Forgot password?</Text>
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
  textWrapper: {
    marginTop: halfGutter,
  },
};

export default (LoginScreen);
