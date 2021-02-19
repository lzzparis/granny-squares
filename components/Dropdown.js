import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { CustomPicker } from 'react-native-custom-picker';
import { get } from 'lodash';

import {
  colors as themeColors,
  gutter,
  halfGutter,
  styles as themeStyles,
} from '../theme';

function Dropdown({
  onValueChange,
  options,
  optionsMeta,
  value,
}) {
  const labelTemplate = (colorId) => {
    const dotColor = get(optionsMeta, `${colorId}.hex`);
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
        <Text style={themeStyles.p}>{get(optionsMeta, `${colorId}.name`, 'Invalid')}</Text>
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
  onValueChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  optionsMeta: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
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
