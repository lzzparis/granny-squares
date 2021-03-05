import React from 'react';
import Logo from '../static/logo.png';
import theme from '../theme';

const {
  colors: themeColors,
  styles: themeStyles,
} = theme;

function ResetPassword({ children }) {
  return (
    <div style={styles.container}>
      <img src={Logo} style={styles.logo} alt="Granny Squares logo" />
      <h1 style={themeStyles.h1}>Granny Squares</h1>
      {children}
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

export default ResetPassword;
