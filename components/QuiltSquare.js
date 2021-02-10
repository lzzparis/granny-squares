import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { map, size } from 'lodash';

function QuiltSquare({ colorIds, projectColors }) {
  const totalTiers = size(colorIds);
  const getSize = (tier) => (100 / totalTiers) * (tier + 1);
  const getOffset = (tier) => (100 - getSize(tier)) / 2;
  const getDepth = (tier) => totalTiers - (tier + 1);

  return (
    <View style={styles.container}>
      {map(colorIds, (colorId, tier) => (
        <View style={{
          width: `${getSize(tier)}%`,
          height: `${getSize(tier)}%`,
          elevation: getDepth(tier),
          zIndex: getDepth(tier),
          backgroundColor: projectColors[colorId].hex,
          position: 'absolute',
          top: `${getOffset(tier)}%`,
          left: `${getOffset(tier)}%`,
        }}
        />
      ))}
    </View>
  );
}

const styles = {
  container: {
    width: '100%',
    height: '100%',
  },
};

QuiltSquare.propTypes = {
  projectColors: PropTypes.object.isRequired,
  colorIds: PropTypes.array.isRequired,
};

export default QuiltSquare;
