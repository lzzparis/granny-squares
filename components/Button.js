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
  level,
  onPress,
  title,
  type = 'filled',
  size = 'medium',
}) {
  const color = colors[`accent${level}`] || colors.accent1;

  const buttonSizeStyles = {
    small: {
      padding: {
        paddingTop: halfGutter / 2,
        paddingBottom: halfGutter / 2,
        paddingLeft: halfGutter,
        paddingRight: halfGutter,
      },
      text: themeStyles.h4,
      border: {
        borderWidth: 2,
      },
    },
    medium: {
      padding: {
        paddingTop: halfGutter,
        paddingBottom: halfGutter,
        paddingLeft: gutter,
        paddingRight: gutter,
      },
      text: themeStyles.h3,
      border: {
        borderWidth: 4,
      },
    },
    large: {
      padding: {
        paddingTop: halfGutter,
        paddingBottom: halfGutter,
        paddingLeft: gutter,
        paddingRight: gutter,
      },
      text: themeStyles.h2,
      border: {
        borderWidth: 4,
      },
    },
  };

  const buttonTypeStyles = {
    filled: { backgroundColor: color },
    outline: {
      backgroundColor: null, ...buttonSizeStyles[size].border, borderColor: color,
    },
  };

  return (
    <Pressable
      onPress={onPress}
      style={{
        ...styles.container,
        ...buttonSizeStyles[size].padding,
        ...buttonTypeStyles[type],
      }}
    >
      <Text
        style={{
          ...buttonSizeStyles[size].text,
          color: type === 'filled' ? colors.invertedText : color,
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
}
const styles = {
  container: {
    ...themeStyles.shadow,
    ...themeStyles.roundedCorners,
    margin: halfGutter,
  },
};

Button.propTypes = {
  level: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf['filled', 'outline'],
};

export default Button;
