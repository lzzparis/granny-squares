import React from 'react';
import PropTypes from 'prop-types';

import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { CustomPicker } from 'react-native-custom-picker';

import {
  halfGutter, gutter, colors as themeColors,
} from '../theme';

function Dropdown({
  options,
  value,
  onValueChange,
  labelTemplate,
}) {
  const getItem = (id, isField) => (
    <View style={{ ...styles.itemContainer, borderBottomWidth: +!isField }}>
      {labelTemplate(id)}
      {
        isField && (
        <Icon
          name="chevron-down"
          type="font-awesome-5"
          size={16}
          color={themeColors.text}
        />
        )
      }
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomPicker
        options={options}
        value={value}
        onValueChange={onValueChange}
        optionTemplate={({ item }) => getItem(item)}
        fieldTemplate={({ selectedItem }) => getItem(selectedItem, true)}
        style={styles.picker}
      />
    </View>
  );
}

Dropdown.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  labelTemplate: PropTypes.func.isRequired,
};

const styles = {
  container: {
    alignSelf: 'stretch',
  },
  picker: {
    margin: gutter,
    borderBottomColor: themeColors.accent2,
    borderBottomWidth: 4,
  },
  itemContainer: {
    width: '100%',
    padding: halfGutter,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: themeColors.border,
  },
  labelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },

};

export default Dropdown;
