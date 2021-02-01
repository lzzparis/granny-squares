import React from 'react';
import PropTypes from 'prop-types';
import {
  Pressable,
  Text,
  View,
} from 'react-native';
import {
  halfGutter, gutter, colors, styles as themeStyles,
} from '../theme';

function Button({ color, onPress, title }) {
  return (
    <Pressable onPress={onPress} style={{ ...styles.container, backgroundColor: color || colors.accent1 }}>
      <View>
        <Text style={{ ...themeStyles.h3, color: colors.invertedText }}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
}
const styles = {
  container: {
    ...themeStyles.shadow,
    margin: 'auto',
    width: 'auto',
    paddingTop: halfGutter,
    paddingBottom: halfGutter,
    paddingLeft: gutter,
    paddingRight: gutter,
    borderRadius: 8,
  },
};

Button.propTypes = {
  color: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Button;
