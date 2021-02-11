import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Text, View } from 'react-native';
import { get, keys } from 'lodash';

import Dropdown from './Dropdown';
import Modal from './Modal';

import {
  halfGutter, colors as themeColors, styles as themeStyles,
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

  useEffect(() => {
    if (colorToEditId) {
      setSelectedColorId(colorToEditId);
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  }, [colorToEditId]);

  const labelTemplate = (colorId) => (
    <View style={styles.labelWrapper}>
      <View
        style={{
          ...styles.dot,
          backgroundColor: get(projectColors, `${colorId}.hex`, themeColors.white),
        }}
      />
      <Text style={themeStyles.p}>{get(projectColors, `${colorId}.name`, 'White')}</Text>
    </View>
  );

  return (
    <Modal
      title="Edit Color"
      visible={modalOpen}
      onRequestClose={onCancel}
      onSave={onSaveColor(selectedColorId, colorToEditIndex)}
      showCancel
    >
      <Dropdown
        options={options}
        value={selectedColorId}
        onValueChange={(itemValue) => setSelectedColorId(itemValue)}
        labelTemplate={labelTemplate}
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
