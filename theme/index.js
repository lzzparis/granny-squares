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
  background: getDark(white),
  paper: white,
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
    margin: 'auto',
    padding: gutter,
    alignItems: 'center',
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
