import React from 'react';
import PropTypes from 'prop-types';
import {
  Pressable,
} from 'react-native';
import Color from 'color';
import { gutter, colors } from '../theme';

function ColorBlob({ name = 'white', hex = '#FFFFFF', size = 32 }) {
  console.log('lzz', name, hex, Color(hex).luminosity());
  const styles = {
    container: {
      backgroundColor: hex,
      margin: gutter,
      width: '100%',
      height: '100%',
      borderRadius: 100,
      borderColor: colors.darkWhite,
      borderWidth: 4,
    },
  };

  const onPress = () => console.log('hi', name, hex);
  return (
    <Pressable onPress={onPress} style={styles.container} />
  );
}

ColorBlob.propTypes = {
  name: PropTypes.string,
  hex: PropTypes.string,
  size: PropTypes.number,
};

export default ColorBlob;
