import { Platform } from 'react-native';

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

export default { shadow };
