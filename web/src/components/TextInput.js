import React, { useState } from 'react';
import PropTypes from 'prop-types';

import theme from '../theme';

const { gutter, styles: themeStyles } = theme;

function TextInput({
  addMargin,
  errorMessage,
  label,
  onChangeText,
  onBlur,
  type = 'text',
  validate,
  value,
}) {
  const [valid, setValid] = useState(false);
  const [touched, setTouched] = useState(false);

  const onChange = (e) => {
    const newValue = e.target.value;
    if (!touched) {
      setTouched(true);
    }
    // validate should return true or false
    setValid(validate(newValue));
    onChangeText(newValue);
  };

  return (
    <div style={{ ...styles.container, marginTop: addMargin ? gutter : 0 }}>
      <h3 style={themeStyles.h3}>{label}</h3>
      <input
        style={themeStyles.textInput}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
      {touched && !valid && <p style={themeStyles.error}>{errorMessage}</p>}
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
