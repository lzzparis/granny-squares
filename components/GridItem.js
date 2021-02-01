import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'react-native';
import { gutter } from '../theme';
import { getGridItemWidth } from '../utils';

function GridItem({ columns, children }) {
  const styles = {
    container: {
      width: getGridItemWidth(columns),
      height: getGridItemWidth(columns),
      padding: gutter,
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

GridItem.propTypes = {
  columns: PropTypes.number,
  children: PropTypes.node,
};

export default GridItem;
