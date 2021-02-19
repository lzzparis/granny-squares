import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { CustomPicker } from 'react-native-custom-picker';
import { get, keys } from 'lodash';

import {
  colors as themeColors,
  gutter,
  halfGutter,
  styles as themeStyles,
} from '../theme';

function Dropdown({
  addMargin,
  label,
  onValueChange,
  options,
  value,
}) {
  const labelTemplate = (colorId) => {
    const dotColor = get(options, `${colorId}.hex`);
    return (
      <View style={styles.labelWrapper}>
        {
        dotColor
        && (
        <View
          style={{
            ...styles.dot,
            backgroundColor: dotColor,
          }}
        />
        )
      }
        <Text style={themeStyles.p}>{get(options, `${colorId}.name`, 'Invalid')}</Text>
      </View>
    );
  };

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
    <View style={{ ...styles.container, marginTop: addMargin ? gutter : 0 }}>
      {label && <Text style={themeStyles.h3}>{label}</Text>}
      <CustomPicker
        fieldTemplate={({ selectedItem }) => getItem(selectedItem, true)}
        onValueChange={onValueChange}
        options={keys(options)}
        optionTemplate={({ item }) => getItem(item)}
        style={styles.picker}
        value={value}
      />
    </View>
  );
}

Dropdown.propTypes = {
  addMargin: PropTypes.bool,
  label: PropTypes.string,
  onValueChange: PropTypes.func.isRequired,
  options: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
};

const styles = {
  container: {
    alignSelf: 'stretch',
  },
  picker: {
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
  dot: {
    width: 20,
    height: 20,
    margin: halfGutter,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: themeColors.border,
  },

};

export default Dropdown;
