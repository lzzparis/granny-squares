import React, { useState } from 'react';
import { Modal } from 'react-native';

import ColorBlob from './ColorBlob';

function ColorEditor({ colorToEdit }) {
  const [modalOpen, setModalOpen] = useState(!!colorToEdit);
  console.log('lzz', { colorToEdit });

  return (
    <Modal
      title="Edit Color"
      visible={modalOpen}
      onRequestClose={() => setModalOpen(false)}
      onSave={() => console.log('Saved!')}
      showCancel
    >
      <ColorBlob {...colorToEdit} />
    </Modal>
  );
}

export default ColorEditor;
