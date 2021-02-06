import React from 'react';
import PropTypes from 'prop-types';
import {
  Pressable,
  Text,
} from 'react-native';
import { Icon } from 'react-native-elements';
import Color from 'color';
import { noop } from 'lodash';
import { gutter, colors as themeColors } from '../theme';

function ColorBlob({
  name = 'white',
  hex = '#FFFFFF',
  locked,
  onPress = noop,
}) {
  const isDark = Color(hex).luminosity() < 0.5;
  const onPressBlob = (e) => {
    e.preventDefault(e);
    onPress();
  };

  return (
    <Pressable
      onPress={onPressBlob}
      style={{ ...styles.container, backgroundColor: hex }}
    >
      {
        !!locked
        && (
        <Icon
          color={isDark ? themeColors.invertedText : themeColors.darkWhite}
          name="lock"
          type="font-awesome-5"
          size={20}
        />
        )
      }
      <Text>{name}</Text>
    </Pressable>
  );
}

const styles = {
  container: {
    margin: gutter,
    width: '100%',
    height: '100%',
    borderRadius: 100,
    borderColor: themeColors.darkWhite,
    borderWidth: 4,
  },
};

ColorBlob.propTypes = {
  name: PropTypes.string.isRequired,
  hex: PropTypes.string.isRequired,
  locked: PropTypes.bool,
  onPress: PropTypes.func,
};

export default ColorBlob;
