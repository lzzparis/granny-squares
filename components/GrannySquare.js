import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'react-native';
import {
  fill,
  get,
  map,
  size,
} from 'lodash';
import { colors as themeColors, gutter } from '../theme';

import GridItem from './GridItem';

function GrannySquare({ colorIds, projectColors }) {
  const tiers = size(colorIds);
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

  return (
    <View style={styles.container}>
      {
        map(grid, (row, rowIndex) => (
          <View key={`granny-square-row-${rowIndex}`} style={styles.row}>
            {
            map(row, (cell, colIndex) => (
              <GridItem key={`granny-square-row-${rowIndex}-col-${colIndex}`} columns={gridSize}>
                <View
                  style={{
                    ...styles.cell,
                    borderWidth: colorIds[cell] ? 2 : null,
                    backgroundColor: get(projectColors, `${colorIds[cell]}.hex`, null),
                  }}
                />
              </GridItem>
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
    marginTop: 2 * gutter,
    width: '100%',
    height: '100%',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cell: {
    margin: 1,
    width: '100%',
    height: '100%',
    borderRadius: 6,
    borderColor: themeColors.darkWhite,
  },
};

GrannySquare.propTypes = {
  colorIds: PropTypes.array.isRequired,
  projectColors: PropTypes.object.isRequired,
};

export default GrannySquare;
