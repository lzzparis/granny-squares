import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { CustomPicker } from 'react-native-custom-picker';
import { get, keys } from 'lodash';

import Modal from './Modal';

import {
  halfGutter, gutter, colors as themeColors, styles as themeStyles,
} from '../theme';

function ColorEditor({
  colorToEditId,
  projectColors,
  onSaveColor,
  onCancel,
  colorToEditIndex,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedColorId, setSelectedColorId] = useState(null);
  const options = keys(projectColors);

  const getItem = (id, isField) => (
    <View style={{ ...styles.itemContainer, borderBottomWidth: +!isField }}>
      <View style={styles.labelWrapper}>
        <View
          style={{
            ...styles.dot,
            backgroundColor: get(projectColors, `${id}.hex`, themeColors.white),
          }}
        />
        <Text style={themeStyles.p}>{get(projectColors, `${id}.name`, 'White')}</Text>
      </View>
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

  useEffect(() => {
    if (colorToEditId) {
      setSelectedColorId(colorToEditId);
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  }, [colorToEditId]);

  return (
    <Modal
      title="Edit Color"
      visible={modalOpen}
      onRequestClose={onCancel}
      onSave={onSaveColor(selectedColorId, colorToEditIndex)}
      showCancel
    >
      <CustomPicker
        options={options}
        value={selectedColorId}
        onValueChange={(itemValue) => setSelectedColorId(itemValue)}
        optionTemplate={({ item }) => getItem(item)}
        fieldTemplate={({ selectedItem }) => getItem(selectedItem, true)}
        style={styles.picker}
      />
    </Modal>
  );
}

ColorEditor.propTypes = {
  colorToEditId: PropTypes.string,
  projectColors: PropTypes.object.isRequired,
  onSaveColor: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  colorToEditIndex: PropTypes.number,
};

const styles = {
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

export default ColorEditor;
