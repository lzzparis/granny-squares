import React from 'react';
import PropTypes from 'prop-types';
import {
  Pressable,
  Text,
  View,
} from 'react-native';
import { halfGutter, colors, styles as themeStyles } from '../theme';

function Button({ color, onPress, title }) {
  const styles = {
    container: {
      backgroundColor: color || colors.accent1,
      margin: 'auto',
      width: 'auto',
      paddingLeft: halfGutter,
      paddingRight: halfGutter,
    },
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View>
        <Text style={{ ...themeStyles.h3, color: colors.invertedText }}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
}

Button.propTypes = {
  color: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Button;
