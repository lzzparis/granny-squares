import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Dropdown from './Dropdown';
import Modal from './Modal';

import {
  gutter, styles as themeStyles,
} from '../theme';

function ColorSelect({
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
      onConfirm={onSaveColor(selectedColorId, colorToEditIndex)}
      confirmLabel="Save"
      showCancel
    >
      <Dropdown
        onValueChange={(itemValue) => setSelectedColorId(itemValue)}
        options={projectColors}
        value={selectedColorId}
      />
    </Modal>
  );
}

ColorSelect.propTypes = {
  colorToEditId: PropTypes.string,
  projectColors: PropTypes.object.isRequired,
  onSaveColor: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  colorToEditIndex: PropTypes.number,
};

const styles = {
  row: {
    ...themeStyles.row,
    marginBottom: gutter,
  },
  labelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
};

export default ColorSelect;
