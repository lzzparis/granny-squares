import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'react-native';
import { HueSlider, SaturationSlider, LightnessSlider } from 'react-native-color';

function ColorSliders({
  hue,
  saturation,
  lightness,
  setHue,
  setSaturation,
  setLightness,
}) {
  return (
    <View>
      <HueSlider
        style={styles.sliderRow}
        gradientSteps={40}
        value={hue}
        onValueChange={setHue}
        animateTransitions={false}
      />
      <SaturationSlider
        style={styles.sliderRow}
        gradientSteps={20}
        value={saturation}
        color={{ h: hue, s: saturation, l: lightness }}
        onValueChange={setSaturation}
        animateTransitions={false}
      />
      <LightnessSlider
        style={styles.sliderRow}
        gradientSteps={20}
        value={lightness}
        color={{ h: hue, s: saturation, l: lightness }}
        onValueChange={setLightness}
        animateTransitions={false}
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

ColorSliders.propTypes = {
  hue: PropTypes.number.isRequired,
  saturation: PropTypes.number.isRequired,
  lightness: PropTypes.number.isRequired,
  setHue: PropTypes.func.isRequired,
  setSaturation: PropTypes.func.isRequired,
  setLightness: PropTypes.func.isRequired,
};

export default ColorSliders;
