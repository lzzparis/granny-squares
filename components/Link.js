import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
} from 'react-native';

import { styles as themeStyles } from '../theme';

function Link({ children, onPress }) {
  return (
    <Text onPress={onPress} style={themeStyles.link}>{children}</Text>
  );
}

Link.propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};
export default Link;
