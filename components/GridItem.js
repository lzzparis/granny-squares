import React from 'react';
import {
  View,
} from 'react-native';
import { colors } from '../theme';
import { halfGutter, getGridItemWidth } from '../utils';

function GridItem({ columns, children }) {
  const styles = {
    container: {
      width: getGridItemWidth(columns),
      height: getGridItemWidth(columns),
      margin: halfGutter,
      justifyContent: 'center',
      alignItems: 'center',
    },
  };

  return (
    <View style={styles.container}>
      {children}
    </View>
  );
}

export default GridItem;
