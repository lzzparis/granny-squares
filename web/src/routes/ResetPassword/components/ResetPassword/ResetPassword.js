import React, { useEffect, useState } from 'react';
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
  const [status, setStatus] = useState({});
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validError, setValidError] = useState('');
  const [matchError, setMatchError] = useState('');

  useEffect(async () => {
    await firebase.auth().checkActionCode(code)
      .then(() => setStatus({ success: true }))
      .catch((err) => setStatus({ success: false, message: err.message }));
  }, [code]);

  // Form functions
  const validatePassword = () => {
    const valid = passwordSchema.validate(password1);
    if (valid) {
      setValidError();
    } else {
      setValidError('Password must have 6-32 characters');
    }
  };
  const checkMatch = () => {
    if (password1 !== password2) {
      setMatchError('Passwords do not match');
    } else {
      setMatchError();
    }
  };
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
                onChangeText={setPassword1}
                onBlur={validatePassword}
                value={password1}
              />
              {validError && <p style={themeStyles.error}>{validError}</p>}
              <TextInput
                type="password"
                label="Confirm Password"
                onChangeText={setPassword2}
                onBlur={checkMatch}
                value={password2}
                addMargin
              />
              {matchError && <p style={themeStyles.error}>{matchError}</p>}
            </div>
            <Button
              title="Reset Password"
              onPress={confirmPasswordReset}
            />
          </>
        )
        : (
          <div style={styles.card}>
            {status.message
              ? <p style={status.success === true ? themeStyles.success : themeStyles.error}>{status.message}</p>
              : <div style={styles.loaderContainer}><DotLoader /></div>}
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
  loaderContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default ResetPassword;
