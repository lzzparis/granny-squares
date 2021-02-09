import { Dimensions } from 'react-native';
import { halfGutter, gutter } from '../theme';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const getGridItemWidth = (columns) => (windowWidth - (4 * gutter)) / columns;

export default {
  halfGutter,
  getGridItemWidth,
  gutter,
  windowHeight,
  windowWidth,
};
