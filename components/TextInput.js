import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TextInput as ReactNativeTextInput,
  View,
} from 'react-native';

import { gutter, styles as themeStyles } from '../theme';

function TextInput({
  label, onChangeText, value, addMargin, ...textInputProps
}) {
  return (
    <View style={{ ...styles.container, marginTop: addMargin ? gutter : 0 }}>
      <Text style={themeStyles.h3}>{label}</Text>
      <ReactNativeTextInput
        style={themeStyles.textInput}
        onChangeText={onChangeText}
        value={value}
        {...textInputProps}
      />
    </View>
  );
}
const styles = {
  container: {
    // flex: 1,
    // alignSelf: 'stretch',
    // marginVertical: gutter,
  },
};
TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default TextInput;
