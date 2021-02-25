import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Keyboard,
  Pressable,
  Text,
} from 'react-native';
import {
  halfGutter,
  gutter,
  getDark,
  colors as themeColors,
  styles as themeStyles,
} from '../theme';

function Button({
  level,
  onPress,
  title,
  type = 'filled',
  size = 'medium',
  addMargin,
  fullWidth,
  disabled,
}) {
  const [pressedIn, setPressedIn] = useState(false);

  let color;
  if (disabled) {
    color = type === 'filled' ? themeColors.darkWhite : themeColors.grey;
  } else if (level === 'destructive') {
    color = themeColors.warn;
  } else {
    color = themeColors[`accent${level}`] || themeColors.accent1;
  }

  let textColor;
  if (disabled) {
    textColor = themeColors.lightBlack;
  } else if (type === 'filled') {
    textColor = themeColors.invertedText;
  } else {
    textColor = color;
  }

  if (pressedIn) {
    color = getDark(color);
  }

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
      disabled={disabled}
      onPress={(e) => { onPress(e); Keyboard.dismiss(); }}
      onPressIn={() => setPressedIn(true)}
      onPressOut={() => setPressedIn(false)}
      style={{
        ...styles.container,
        ...buttonSizeStyles[size].padding,
        ...buttonTypeStyles[type],
        marginLeft: addMargin && gutter,
        flex: fullWidth ? 1 : 0,
        flexGrow: fullWidth ? 1 : 0,
        flexShrink: fullWidth ? 1 : 0,

      }}
    >
      <Text
        style={{
          ...buttonSizeStyles[size].text,
          color: textColor,
          textAlign: 'center',
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
  },
};

Button.propTypes = {
  addMargin: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  level: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string,
  size: PropTypes.string,
};

export default Button;
