import React from 'react';
import PropTypes from 'prop-types';

import {
  Icon,
} from 'react-native-elements';
import { styles as themeStyles } from '../theme';

function PlaceholderIcon({ size }) {
  return (
    <Icon
      name="minus-circle"
      type="font-awesome-5"
      size={size || 24}
      iconStyle={{ ...themeStyles.headerIcon, color: 'transparent' }}

    />
  );
}

PlaceholderIcon.propTypes = {
  size: PropTypes.number,
};

export default PlaceholderIcon;
