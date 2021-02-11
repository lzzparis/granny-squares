import { Platform } from 'react-native';
import { DefaultTheme } from '@react-navigation/native';

import Color from 'color';

const getLight = (color) => Color(color).lighten(0.15).hex();
const getDark = (color) => Color(color).darken(0.2).hex();

const primary = 'cornflowerblue';
const accent1 = 'plum';
const accent2 = 'peachpuff';
const accent3 = 'palegreen';
const accent4 = 'pink';

const black = 'black';
const white = 'white';
const lightBlack = getLight(black);
const darkWhite = getDark(white);

const error = '#c93732';
const success = '#32c96a';

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
  border: darkWhite,
  background: getLight(darkWhite),
  paper: white,
  white,
  black,
  lightBlack,
  darkWhite,
  error,
  success,
};

const typography = {
  h1: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 24,
    color: colors.invertedText,
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
  h4: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
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

const roundedCorners = {
  borderRadius: 8,
};
const circle = {
  borderRadius: 100,
};

export const styles = {
  ...typography,
  roundedCorners,
  circle,
  screenContainer: {
    width: '100%',
    height: '100%',
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scrollContainer: {
    padding: gutter,
  },
  row: {
    flexDirection: 'row',
  },
  card: {
    width: '100%',
    margin: 'auto',
    marginBottom: gutter,
    marginTop: gutter,
    padding: gutter,
    backgroundColor: colors.paper,
    ...roundedCorners,
  },
  textInput: {
    ...typography.p,
    paddingLeft: halfGutter,
    paddingRight: halfGutter,
    borderBottomColor: colors.accent2,
    borderBottomWidth: 4,
  },
  headerIcon: {
    paddingRight: gutter,
    color: colors.invertedText,
  },
};

export const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary,
    background: colors.background,
    card: colors.paper,
    text: colors.text,
    border: colors.border,
    notification: colors.accent1,
  },
};

export default {
  colors,
  styles,
  buttonSizes,
  halfGutter,
  gutter,
};
