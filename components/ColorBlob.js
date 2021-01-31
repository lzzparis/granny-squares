import React from 'react';
import PropTypes from 'prop-types';
import {
  Pressable,
} from 'react-native';
import { gutter } from '../theme';

function ColorBlob({ color, size = 32 }) {
  const styles = {
    container: {
      backgroundColor: color,
      margin: gutter,
      width: size,
      height: size,
      borderRadius: 100,
    },
  };

  const onPress = console.log('hi', color);
  return (
    <Pressable onPress={onPress} style={styles.container} />
  );
}

ColorBlob.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

export default ColorBlob;
