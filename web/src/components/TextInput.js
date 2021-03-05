import React from 'react';
import PropTypes from 'prop-types';

import theme from '../theme';

const { gutter, styles: themeStyles } = theme;

function TextInput({
  label, onChangeText, onBlur, value, addMargin, type,
}) {
  return (
    <div style={{ ...styles.container, marginTop: addMargin ? gutter : 0 }}>
      <h3 style={themeStyles.h3}>{label}</h3>
      <input
        type={type}
        style={{ ...themeStyles.textInput, width: '100%' }}
        onChange={(e) => onChangeText(e.target.value)}
        onBlur={onBlur}
        value={value}
      />
    </div>
  );
}
const styles = {
  container: {
  },
};
TextInput.propTypes = {
  addMargin: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default TextInput;
