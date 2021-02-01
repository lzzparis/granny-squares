import React from 'react';
import PropTypes from 'prop-types';
import {
  Pressable,
} from 'react-native';
import { Icon } from 'react-native-elements';
import Color from 'color';
import { gutter, colors } from '../theme';

function ColorBlob({
  name = 'white', hex = '#FFFFFF', size = 32, locked,
}) {
  const isDark = Color(hex).luminosity() < 0.5;

  const onPress = () => console.log('hi', name, hex);
  return (
    <Pressable onPress={onPress} style={{ ...styles.container, backgroundColor: hex }}>
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
    justifyContent: 'center',
  },
};

ColorBlob.propTypes = {
  name: PropTypes.string,
  hex: PropTypes.string,
  size: PropTypes.number,
};

export default ColorBlob;
