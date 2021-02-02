import React from 'react';
import PropTypes from 'prop-types';
import {
  Pressable,
  Text,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import Color from 'color';
import { capitalize } from 'lodash';
import { gutter, colors } from '../theme';

function ColorBlob({
  name = 'white', hex = '#FFFFFF', size = 32, locked,
}) {
  const isDark = Color(hex).luminosity() < 0.5;

  const onPress = () => console.log('hi', name, hex);
  return (
    <Pressable onPress={onPress} style={{ ...styles.container }}>
      <View style={{ ...styles.blob, backgroundColor: hex }}>
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
      </View>
      <Text>{capitalize(name)}</Text>
    </Pressable>
  );
}

const styles = {
  container: {
    margin: gutter,
    width: '100%',
    height: '100%',
  },
  blob: {
    width: 'auto',
    height: 'auto',
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
