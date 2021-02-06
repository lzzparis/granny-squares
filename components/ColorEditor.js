import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Picker } from '@react-native-picker/picker';
import { map } from 'lodash';

import Modal from './Modal';

function ColorEditor({
  colorToEditId,
  projectColors,
  onSaveColor,
  onCancel,
  colorToEditIndex,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedColorId, setSelectedColorId] = useState(null);

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
      onSave={onSaveColor(projectColors[selectedColorId], colorToEditIndex)}
      showCancel
    >
      <Picker
        selectedValue={selectedColorId}
        onValueChange={(itemValue) => setSelectedColorId(itemValue)}
      >
        {map(projectColors, (projectColor, projectColorId) => (
          <Picker.Item
            key={`project-color-select-${projectColorId}`}
            label={projectColor.name}
            value={projectColorId}
          />
        ))}
      </Picker>
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

export default ColorEditor;
