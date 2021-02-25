import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
} from 'react-native';
import { colors as themeColors, styles as themeStyles } from '../theme';

function InfoSubheader({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {children}
      </Text>
    </View>
  );
}

const styles = {
  container: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: themeColors.darkWhite,
  },
  text: {
    ...themeStyles.h4,
    width: '100%',
    textAlign: 'center',
  },
};

InfoSubheader.propTypes = {
  children: PropTypes.string.isRequired,
};

export default InfoSubheader;
