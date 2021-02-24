import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {
  useFirebase,
} from 'react-redux-firebase';

import Logo from '../assets/adaptive-icon.png';

import Button from '../components/Button';
import Link from '../components/Link';
import TextInput from '../components/TextInput';

import { MODE_AUTH_SIGN_IN, MODE_AUTH_SIGN_UP } from '../constants';

import { halfGutter, colors as themeColors, styles as themeStyles } from '../theme';

function LoginScreen() {
  // Hooks
  const firebase = useFirebase();
  const [mode, setMode] = useState(MODE_AUTH_SIGN_UP);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [authError, setAuthError] = useState();

  // Button functions
  const switchMode = (newMode) => (e) => {
    e.preventDefault();
    setMode(newMode);
  };

  const loginUser = (e) => {
    e.preventDefault();
    firebase.login({ email, password })
      .then((res) => res)
      .catch((err) => setAuthError(err.message));
  };
  const registerUser = (e) => {
    e.preventDefault();
    firebase.createUser({ email, password }, { displayName: name, email })
      .then((res) => res)
      .catch((err) => setAuthError(err.message));
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
          <Image style={styles.logo} source={Logo} />
          <Text style={themeStyles.h1}>{mode === MODE_AUTH_SIGN_UP ? 'Welcome!' : 'Welcome back!'}</Text>
          <View style={themeStyles.card}>
            {mode === MODE_AUTH_SIGN_UP
              && (
              <TextInput
                label="Name"
                value={name}
                onChangeText={(text) => setName(text)}
              />
              )}
            <TextInput
              label="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              autoCapitalize="none"
              addMargin={mode === MODE_AUTH_SIGN_UP}
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
                  {authError}
                </Text>
              </View>
              )}
          </View>
          <View style={styles.buttonGroup}>
            {mode === MODE_AUTH_SIGN_UP
              ? (
                <Button
                  title="Sign Up"
                  onPress={registerUser}
                  disabled={disableButtons}
                  fullWidth
                />
              ) : (
                <Button
                  title="Sign In"
                  onPress={loginUser}
                  disabled={disableButtons}
                  fullWidth
                />
              )}
          </View>
          {
            mode === MODE_AUTH_SIGN_UP
              ? (
                <View style={styles.textTogether}>
                  <Text style={themeStyles.h4}>Already have an account?  </Text>
                  <Link onPress={switchMode(MODE_AUTH_SIGN_IN)}>Sign in</Link>
                </View>
              )
              : (
                <View style={styles.textApart}>
                  <Link>Forgot password?</Link>
                  <Link onPress={switchMode(MODE_AUTH_SIGN_UP)}>Sign up</Link>
                </View>
              )
        }
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
  logo: {
    width: 64,
    height: 64,
  },
  buttonGroup: {
    width: '100%',
    flexDirection: 'row',
  },
  textWrapper: {
    marginTop: halfGutter,
  },
  textTogether: {
    width: '100%',
    marginTop: halfGutter,
    flexDirection: 'row',
  },
  textApart: {
    width: '100%',
    marginTop: halfGutter,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
};

export default (LoginScreen);
