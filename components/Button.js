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

function Button({
  level, onPress, title, type = 'filled',
}) {
  const color = colors[`accent${level}`] || colors.accent1;
  const buttonTypeStyles = {
    filled: { backgroundColor: color },
    outline: {
      backgroundColor: null, borderWidth: 4, borderColor: color,
    },
  };
  return (
    <Pressable onPress={onPress} style={{ ...styles.container, ...buttonTypeStyles[type] }}>
      <View>
        <Text style={{ ...themeStyles.h3, color: type === 'filled' ? colors.invertedText : color }}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
}
const styles = {
  container: {
    ...themeStyles.shadow,
    margin: halfGutter,
    paddingTop: halfGutter,
    paddingBottom: halfGutter,
    paddingLeft: gutter,
    paddingRight: gutter,
    borderRadius: 8,
  },
};

Button.propTypes = {
  level: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf['filled', 'outline'],
};

export default Button;
