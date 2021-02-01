import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'react-native';
import Color from 'color';
import { map, size } from 'lodash';
import { gutter, colors } from '../theme';

function GrannySquare({ colors = ['red', 'orange', 'yellow', 'green'] }) {
  const tiers = size(colors);
  const gridSize = 2 * tiers + 1;

  const grid = [];
  let i;
  let j;
  let t;

  console.log('lzz ----');
  for (i = 0; i < gridSize; i++) {
    grid[i] = new Array(gridSize);
    for (j = 0; j < gridSize; j++) {
      if ((i + j) % 2 === 0) {
        // console.log('lzz null          ', `[${i}][${j}]`, null);
        grid[i][j] = null;
      } else if (i < tiers - 1 /* || j < tiers */) {
        // if (i < tiers) {
        console.log('lzz i < tiers - 1]', `[${i}][${j}]`, tiers - i);
        grid[i][j] = colors[tiers - i - 1];
        // } else {
        //   console.log('lzz j < tiers - 1]', j, tiers - j);
        //   grid[i][j] = colors[tiers - j];
        // }
      } else if (i > tiers + 1 /* || j > tiers */) {
        // if (i > tiers) {
        console.log('lzz i > tiers - 1]', `[${i}][${j}]`, i - tiers);
        grid[i][j] = colors[i - 1 - tiers];
        // } else {
        //   console.log('lzz j > tiers - 1]', j, j - tiers);
        //   grid[i][j] = colors[j - tiers];
        // }
      } else {
        console.log('lzz default       ', `[${i}][${j}]`, 0);
        grid[i][j] = colors[0];
      }
    }
  }

  // console.log('hi', grid);
  return (
    <View style={styles.container}>
      {
        map(grid, (row, rowNum) => (
          <View style={styles.row}>
            {
            map(row, (cell, colNum) => (
              <View style={{ ...styles.cell, backgroundColor: cell }} />
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
    borderRadius: 4,
    borderWidth: 1,
  },
};

export default GrannySquare;
