import React from 'react';
import { Switch as ReactNativeSwitch } from 'react-native';
import { colors as themeColors } from '../theme';

function Switch({ onValueChange, value }) {
  return (
    <ReactNativeSwitch
      trackColor={{ false: themeColors.darkWhite, true: themeColors.accent1 }}
      thumbColor={value ? '#f5dd4b' : '#f4f3f4'}
      ios_backgroundColor="#3e3e3e"
      onValueChange={onValueChange}
      value={value}
    />
  );
}

export default Switch;
