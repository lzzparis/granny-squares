import React from 'react';
import PropTypes from 'prop-types';
import {
  Pressable,
  Text,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import Color from 'color';
import { capitalize, noop } from 'lodash';
import { gutter, colors } from '../theme';

function ColorBlob({
  name = 'white',
  hex = '#FFFFFF',
  colorId,
  size = 32,
  locked,
  onPress = noop,
}) {
  const isDark = Color(hex).luminosity() < 0.5;
  const onPressBlob = (e) => {
    e.preventDefault(e);
    onPress({ name, hex, colorId });
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
          color={isDark ? colors.invertedText : colors.darkWhite}
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
    borderColor: colors.darkWhite,
    borderWidth: 4,
  },
};

ColorBlob.propTypes = {
  name: PropTypes.string,
  hex: PropTypes.string,
  size: PropTypes.number,
};

export default ColorBlob;
