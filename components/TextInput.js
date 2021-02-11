import React from 'react';
import {
  Text,
  TextInput as ReactNativeTextInput,
  View,
} from 'react-native';

import { gutter, styles as themeStyles } from '../theme';

function TextInput({ label, onChangeText, value }) {
  return (
    <View style={styles.container}>
      <Text style={themeStyles.h2}>{label}</Text>
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
    marginBottom: gutter,
  },
};

export default TextInput;
