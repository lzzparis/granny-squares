import React, { useState, useEffect } from 'react';
import {
  View,
} from 'react-native';
import { HueSlider, SaturationSlider, LightnessSlider } from 'react-native-color';
import tinycolor from 'tinycolor2';

function ColorSliders({ color, updateColor }) {
  const [hue, setHue] = useState(tinycolor(color).toHsl().h);
  const [saturation, setSaturation] = useState(tinycolor(color).toHsl().s);
  const [lightness, setLightness] = useState(tinycolor(color).toHsl().l);

  console.log('lzz tinycolor');
  const getHex = (h, s, l) => {
    console.log('lzz hsl', h, s, l);
    const hsl = tinycolor(`hsl(${hue}, ${saturation}, ${lightness})`);
    return `#${hsl.toHex()}`;
  };

  useEffect(() => {
    const hex = getHex(hue, saturation, lightness);
    updateColor(hex);
  }, [hue, saturation, lightness]);
  return (
    <View>
      <HueSlider
        style={styles.sliderRow}
        gradientSteps={40}
        value={hue}
        onValueChange={setHue}
      />
      <SaturationSlider
        style={styles.sliderRow}
        gradientSteps={20}
        value={saturation}
        color={{ h: hue, s: saturation, l: lightness }}
        onValueChange={setSaturation}
      />
      <LightnessSlider
        style={styles.sliderRow}
        gradientSteps={20}
        value={lightness}
        color={{ h: hue, s: saturation, l: lightness }}
        onValueChange={setLightness}
      />
    </View>
  );
}

const styles = {
  sliderContainer: {},
  sliderRow: {
    alignSelf: 'stretch',
  },
};

export default ColorSliders;
