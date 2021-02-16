import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import tinycolor from 'tinycolor2';

import ColorBlob from './ColorBlob';
import ColorSliders from './ColorSliders';
import TextInput from './TextInput';
import Modal from './Modal';

import {
  halfGutter, gutter, colors as themeColors, styles as themeStyles,
} from '../theme';

const getHue = (color) => tinycolor(color).toHsl().h;
const getSaturation = (color) => tinycolor(color).toHsl().s;
const getLightness = (color) => tinycolor(color).toHsl().l;

const getHex = (h, s, l) => {
  const hsl = tinycolor(`hsl(${h}, ${s}, ${l})`);
  return hsl.toHexString();
};

function ColorPicker({
  colorId,
  name: savedName,
  hex: savedHex,
  onSaveColor,
  onCancel,
  visible,
}) {
  const [hue, setHue] = useState(getHue(savedHex));
  const [saturation, setSaturation] = useState(getSaturation(savedHex));
  const [lightness, setLightness] = useState(getLightness(savedHex));
  const [name, setName] = useState(savedName);

  useEffect(() => {
    setName(savedName);
    setHue(getHue(savedHex));
    setSaturation(getSaturation(savedHex));
    setLightness(getLightness(savedHex));
  }, [savedName, savedHex]);

  return (
    <Modal
      title="Edit Color"
      visible={visible}
      onRequestClose={onCancel}
      onConfirm={onSaveColor({
        name,
        hex: getHex(hue, saturation, lightness),
        colorId,
      })}
      confirmLabel="Save"
      showCancel
    >
      <View style={styles.row}>
        <View style={styles.blobSquare}>
          <ColorBlob
            hsl={{ h: hue, s: saturation, l: lightness }}
            style={{ width: 140 }}
          />
        </View>
        <TextInput
          label="Name"
          value={name}
          onChangeText={setName}
        />
      </View>
      <ColorSliders
        hue={hue}
        saturation={saturation}
        lightness={lightness}
        setHue={setHue}
        setSaturation={setSaturation}
        setLightness={setLightness}
      />
    </Modal>
  );
}

ColorPicker.propTypes = {
  visible: PropTypes.bool.isRequired,
  colorId: PropTypes.string.isRequired,
  name: PropTypes.string,
  hex: PropTypes.string,
  onSaveColor: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

const styles = {
  row: {
    ...themeStyles.row,
    marginBottom: gutter,
  },
  blobSquare: {
    width: 100,
    height: 100,
    marginRight: gutter,

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

export default ColorPicker;
