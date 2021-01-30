import { Dimensions, Platform } from 'react-native';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const halfGutter = 8;
export const gutter = halfGutter * 2;
export const getGridItemWidth = (columns) => (windowWidth - ((columns + 1) * gutter)) / columns;

export const shadowProps = Platform.select({
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

export default {
  halfGutter,
  getGridItemWidth,
  gutter,
  shadowProps,
  windowHeight,
  windowWidth,
};