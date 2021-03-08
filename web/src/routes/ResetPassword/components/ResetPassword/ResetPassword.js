import React, { useEffect, useState, useRef } from 'react';
import firebase from 'firebase';
import { get } from 'lodash';
import Button from '../../../../components/Button';
import DotLoader from '../../../../components/DotLoader';
import TextInput from '../../../../components/TextInput';
import theme from '../../../../theme';
import { passwordSchema } from '../../../../utils';

const {
  styles: themeStyles,
} = theme;

function ResetPassword(props) {
  const search = get(props, 'location.search');
  const params = new URLSearchParams(search);
  const code = params.get('oobCode');

  // State
  const [status, setStatus] = useState({});
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(async () => {
    await firebase.auth().checkActionCode(code)
      .then(() => setStatus({ success: true }))
      .catch((err) => setStatus({ success: false, message: err.message }));
  }, [code]);

  const isPassword1Valid = (newPassword1) => passwordSchema.validate(newPassword1);
  const isPassword2Valid = (newPassword2) => password1 === newPassword2;

  // Form functions
  const confirmPasswordReset = async (e) => {
    e.preventDefault();
    await firebase.auth().confirmPasswordReset(code, password2)
      .then(() => setStatus({ success: true, message: 'Success! Please return to the app to sign in with your new password' }))
      .catch((err) => setStatus({ success: false, message: err.message }));
  };

  return (
    <div style={styles.container}>
      {status.success
        ? (
          <>
            <div style={styles.card}>
              <TextInput
                type="password"
                label="New Password"
                value={password1}
                onChangeText={setPassword1}
                validate={isPassword1Valid}
                errorMessage="Password must have 6-32 characters"
              />
              <TextInput
                type="password"
                label="Confirm Password"
                value={password2}
                onChangeText={setPassword2}
                validate={isPassword2Valid}
                errorMessage="Passwords do not match"
                addMargin
              />
            </div>
            <Button
              title="Reset Password"
              onPress={confirmPasswordReset}
              disabled={!password1 || !password2 || !isPassword1Valid(password1) || !isPassword2Valid(password2)}
            />
          </>
        )
        : (
          <div style={styles.card}>
            <div style={styles.centerContent}>
              {status.message
                ? <p style={status.success === true ? themeStyles.success : themeStyles.error}>{status.message}</p>
                : <DotLoader />}
            </div>
          </div>
        )}
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    ...themeStyles.card,
    width: '50%',
    minHeight: '100px',
  },
  logo: {
    width: '160px',
  },
  centerContent: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default ResetPassword;
