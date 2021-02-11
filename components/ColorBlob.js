import React from 'react';
import PropTypes from 'prop-types';
import {
  Pressable,
} from 'react-native';
import { Icon } from 'react-native-elements';
import Color from 'color';
import { noop } from 'lodash';
import { gutter, colors as themeColors } from '../theme';

function ColorBlob({
  hex = '#FFFFFF',
  locked,
  onPress = noop,
  onLongPress = noop,
}) {
  const isLight = Color(hex).luminosity() < 0.9;
  const onPressBlob = (e) => {
    e.preventDefault(e);
    onPress();
  };

  const onLongPressBlob = (e) => {
    e.preventDefault(e);
    onLongPress();
  };

  return (
    <Pressable
      onPress={onPressBlob}
      onLongPress={onLongPressBlob}
      delayLongPress={200}
      style={{ ...styles.container, backgroundColor: hex }}
    >
      {
        !!locked
        && (
        <Icon
          color={isLight ? themeColors.darkWhite : themeColors.invertedText}
          name="lock"
          type="font-awesome-5"
          size={20}
        />
        )
      }
    </Pressable>
  );
}

const styles = {
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    borderRadius: 100,
    borderColor: themeColors.border,
    borderWidth: 4,
  },
};

ColorBlob.propTypes = {
  hex: PropTypes.string.isRequired,
  locked: PropTypes.bool,
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
};

export default ColorBlob;
