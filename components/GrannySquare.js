import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'react-native';
import Color from 'color';
import {
  fill,
  get,
  map,
  size,
} from 'lodash';
import { colors as themeColors, gutter } from '../theme';

function GrannySquare({ colors }) {
  const tiers = size(colors);
  const gridSize = 2 * tiers + 1;

  const grid = [];
  let i;
  let j;

  for (i = 0; i < gridSize; i++) {
    grid[i] = new Array(gridSize);
    if (i < tiers - 1) {
      fill(grid[i], tiers - i - 1);
    } else if (i > tiers + 1 /* || j > tiers */) {
      fill(grid[i], i - 1 - tiers);
    } else {
      fill(grid[i], 0);
    }
  }
  for (i = 0; i < gridSize; i++) {
    for (j = 0; j < gridSize; j++) {
      if ((i + j) % 2 === 0) {
        grid[i][j] = null;
      } else if (i + j < tiers * 2) {
        grid[j][i] = grid[i][j];
      } else {
        grid[i][j] = grid[j][i];
      }
    }
  }

  console.log('lzz', { colors, gridSize, tiers });
  return (
    <View style={styles.container}>
      {
        map(grid, (row) => (
          <View style={styles.row}>
            {
            map(row, (cell) => (
              <View style={{ ...styles.cell, backgroundColor: get(colors[cell], 'hex', null) }} />
            ))
          }
          </View>
        ))
    }
    </View>
  );
}

const styles = {
  container: {
    margin: gutter,
    width: '100%',
    height: '100%',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 30,
    height: 30,
    borderRadius: 6,
    borderColor: themeColors.darkWhite,
    borderWidth: 2,
  },
};

export default GrannySquare;
