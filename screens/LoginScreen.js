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
import EmailValidator from 'email-validator';
import PasswordValidator from 'password-validator';

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
  const [emailError, setEmailError] = useState();
  const [password, setPassword] = useState();
  const [passwordError, setPasswordError] = useState();
  const [authError, setAuthError] = useState();

  // Validator functions
  const validateEmail = () => {
    const valid = EmailValidator.validate(email);
    if (valid) {
      setEmailError();
    } else {
      setEmailError('Invalid email');
    }
  };
  const validatePassword = () => {
    const schema = new PasswordValidator();
    schema
      .is().min(6)
      .is().max(32);
    const valid = schema.validate(password);
    if (valid) {
      setPasswordError();
    } else {
      setPasswordError('Password must have 6-32 characters');
    }
  };

  // Button functions
  const switchMode = (newMode) => (e) => {
    e.preventDefault();
    setAuthError();
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
              onBlur={validateEmail}
              autoCapitalize="none"
              addMargin={mode === MODE_AUTH_SIGN_UP}
            />
            {emailError && <Text style={themeStyles.error}>{emailError}</Text>}
            <TextInput
              label="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              onBlur={validatePassword}
              secureTextEntry
              addMargin
            />
            {passwordError && <Text style={themeStyles.error}>{passwordError}</Text>}
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
