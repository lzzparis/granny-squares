import React, { useState } from 'react';
// import { useFirebase } from 'react-redux-firebase';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import Logo from '../../static/logo.png';
import theme from '../../theme';
import { passwordSchema } from '../../utils';

const {
  colors: themeColors,
  styles: themeStyles,
} = theme;

function App() {
  // const firebase = useFirebase();
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [validError, setValidError] = useState('');
  const [matchError, setMatchError] = useState('');

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
      <img src={Logo} style={styles.logo} alt="Granny Squares logo" />
      <h1 style={themeStyles.h1}>Granny Squares</h1>
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
    height: '100vh',
    backgroundColor: themeColors.primary,
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

export default App;
