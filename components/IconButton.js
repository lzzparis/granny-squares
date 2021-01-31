import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';
import { keys } from 'lodash';
import { colors, buttonSizes } from '../theme';

function IconButton({
  level, name, onPress, size = 'medium',
}) {
  const color = colors[`accent${level}`] || colors.accent1;
  return (
    <Icon
      name={name}
      type="font-awesome-5"
      size={buttonSizes[size] || buttonSizes.medium}
      color={color}
      onPress={onPress}
      raised
      reverse
    />
  );
}

const buttonSizeKeys = keys(buttonSizes);

IconButton.propTypes = {
  level: PropTypes.oneOfType[PropTypes.string, PropTypes.number],
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  size: PropTypes.oneOf[buttonSizeKeys],
};

export default IconButton;
