import React from 'react';
import {
  Pressable,
  Text,
  View,
} from 'react-native';
import { halfGutter, colors, styles as themeStyles } from '../theme';

function Button({ color, title, onPress }) {
  const styles = {
    container: {
      backgroundColor: color,
      margin: 'auto',
      width: 'auto',
      paddingLeft: halfGutter,
      paddingRight: halfGutter,
    },
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View>
        <Text style={{ ...themeStyles.h3, color: colors.invertedText }}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
}

export default Button;
