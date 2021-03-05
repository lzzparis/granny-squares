import React, { useState } from 'react';
import Button from '../../../../components/Button';
import TextInput from '../../../../components/TextInput';
import theme from '../../../../theme';
import { passwordSchema } from '../../../../utils';

const {
  styles: themeStyles,
} = theme;

function ResetPassword() {
  // const firebase = useFirebase();
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [validError, setValidError] = useState('');
  const [matchError, setMatchError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
  const confirmPasswordReset = (e) => {
    e.preventDefault();
    console.log('lzz passwords', { password1, password2 });
  };

  return (
    <div style={styles.container}>
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
