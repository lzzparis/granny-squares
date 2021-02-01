import { Platform } from 'react-native';
import Color from 'color';

const primary = 'plum';
const accent1 = 'peachpuff';
const accent2 = 'pink';
const accent3 = 'paleturquoise';
const accent4 = 'palegreen';

const black = 'black';
const white = 'white';

const getLight = (color) => Color(color).lighten(0.15).hex();
const getDark = (color) => Color(color).darken(0.2).hex();

export const shadow = Platform.select({
  android: {
    elevation: 2,
  },
  default: {
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
});

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
  background: getDark(white),
  paper: white,
  white,
  black,
  lightBlack: getLight(black),
  darkWhite: getDark(white),
};

const typography = {
  h1: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 24,
    color: colors.text,
  },
  h2: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 20,
    color: colors.text,
  },
  h3: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 18,
    color: colors.text,
  },
  p: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: colors.text,
  },
  em: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 16,
    color: colors.text,
  },
};

export const halfGutter = 8;
export const gutter = halfGutter * 2;

export const buttonSizes = {
  small: 24,
  medium: 32,
  large: 48,
};

export const styles = {
  ...typography,
  screenContainer: {
    width: '100%',
    height: '100%',
    margin: 'auto',
    padding: gutter,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  card: {
    width: '100%',
    margin: 'auto',
    padding: halfGutter,
    backgroundColor: colors.paper,
    borderRadius: 8,
  },
  textInput: {
    ...typography.p,
    paddingLeft: halfGutter,
    paddingRight: halfGutter,
    borderBottomColor: colors.accent1,
    borderBottomWidth: 4,
  },
};

export default {
  colors,
  styles,
  buttonSizes,
  halfGutter,
  gutter,
};
