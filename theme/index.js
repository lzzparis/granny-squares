import Color from 'color';

const primary = 'plum';
const accent1 = 'peachpuff';
const accent2 = 'peachpuff';
const accent3 = 'paleturquoise';
const accent4 = 'palegreen';

const black = 'black';
const white = 'white';

const getLight = (color) => Color(color).lighten(0.32).hex();
const getDark = (color) => Color(color).darken(0.5).hex();

export const colors = {
  primary,
  primaryLight: getLight(primary),
  primaryDark: getDark(primary),
  accent1,
  accent1Light: getLight(accent1),
  accent1Dark: getDark(accent1),
  accent2,
  accent2Light: getLight(accent2),
  accent2Dark: getDark(accent2),
  accent3,
  accent3Light: getLight(accent3),
  accent3Dark: getDark(accent3),
  accent4,
  accent4Light: getLight(accent4),
  accent4Dark: getDark(accent4),
  text: black,
  invertedText: white,
  background: white,
};

console.log('colors', colors);

export default {
  colors,
};
