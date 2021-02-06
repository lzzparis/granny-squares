import React, { useState, useEffect } from 'react';
import {
  Text,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { get, map, sample } from 'lodash';

import ColorBlob from './ColorBlob';
import Modal from './Modal';

function ColorEditor({
  colorToEditId,
  projectColors,
  onSaveColor,
  onCancel,
  index,
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
      onSave={onSaveColor(projectColors[selectedColorId], index)}
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

export default ColorEditor;
