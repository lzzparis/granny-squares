import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Text, View } from 'react-native';
import { CustomPicker } from 'react-native-custom-picker';
import { map } from 'lodash';

import Modal from './Modal';

import { halfGutter, colors as themeColors } from '../theme';

function ColorEditor({
  colorToEditId,
  projectColors,
  onSaveColor,
  onCancel,
  colorToEditIndex,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedColorId, setSelectedColorId] = useState(null);
  const options = map(projectColors, ({ name, hex }, colorId) => ({
    hex,
    label: name,
    value: colorId,
  }));
  const renderOption = ({ item, getLabel }) => (
    <View style={styles.listItemContainer}>
      <View style={{ ...styles.listItemDot, backgroundColor: item.hex }} />
      <Text style={styles.listItemLabel}>{getLabel(item)}</Text>
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
        optionTemplate={renderOption}
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
  listItemContainer: {
    padding: halfGutter,
    flexDirection: 'row',
  },
  listItemDot: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: themeColors.darkWhite,
  },
};

export default ColorEditor;
