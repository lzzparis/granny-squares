import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import { get } from 'lodash';
import Button from '../../../../components/Button';
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
  const [codeStatus, setCodeStatus] = useState({});
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [validError, setValidError] = useState('');
  const [matchError, setMatchError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(async () => {
    await firebase.auth().checkActionCode(code)
      .then(() => setCodeStatus({ valid: true }))
      .catch((err) => setCodeStatus({ valid: false, message: err.message }));
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
      .then(() => console.log('Success!!'))
      .catch((err) => console.error(err.message));
  };

  return (
    <div style={styles.container}>
      {codeStatus.valid
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
            <p style={themeStyles.error}>{codeStatus.message || 'Loading...'}</p>
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
  },
  logo: {
    width: '160px',
  },
};

export default ResetPassword;
