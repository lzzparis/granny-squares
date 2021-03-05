import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {
  useFirebase,
} from 'react-redux-firebase';
import EmailValidator from 'email-validator';

import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { halfGutter, colors as themeColors, styles as themeStyles } from '../theme';

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be whitelisted in the Firebase Console.
  url: 'http://lizzieparis.com',
  // This must be true.
  handleCodeInApp: true,
};

function ForgotPasswordScreen() {
  // Hooks
  const firebase = useFirebase();

  // State Hooks
  const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState();
  // const [password, setPassword] = useState();
  // const [passwordError, setPasswordError] = useState();
  const [sendEmailFeedback, setSendEmailFeedback] = useState();

  // Validator functions
  const validateEmail = () => {
    const valid = EmailValidator.validate(email);
    if (valid) {
      setEmailError();
    } else {
      setEmailError('Invalid email');
    }
  };

  // Functions
  const resetPassword = async () => {
    await firebase.auth().sendPasswordResetEmail(email, actionCodeSettings)
      .then(() => setSendEmailFeedback({ type: 'success', message: 'Success! Check your email for a reset link.' }))
      .catch(({ message }) => setSendEmailFeedback({ type: 'error', message }));
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
          <Text style={themeStyles.h1}>Forgot password?</Text>
          <View style={themeStyles.card}>
            <TextInput
              label="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              onBlur={validateEmail}
              autoCapitalize="none"
            />
            {sendEmailFeedback && (
              <View style={styles.textWrapper}>
                <Text
                  style={sendEmailFeedback.type === 'success' ? themeStyles.info : themeStyles.error}
                >
                  {sendEmailFeedback.message}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              title="Send Email"
              onPress={resetPassword}
              disabled={emailError}
              fullWidth
            />
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
  buttonWrapper: {
    width: '100%',
    flexDirection: 'row',
  },
  textWrapper: {
    marginTop: halfGutter,
  },
};
export default (ForgotPasswordScreen);
