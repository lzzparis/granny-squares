import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TextInput as ReactNativeTextInput,
  View,
} from 'react-native';

import { styles as themeStyles } from '../theme';

function TextInput({
  label, onChangeText, value,
}) {
  return (
    <View style={styles.container}>
      <Text style={themeStyles.h3}>{label}</Text>
      <ReactNativeTextInput
        style={themeStyles.textInput}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
}
const styles = {
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
};
TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default TextInput;
