import { reduce } from 'lodash';
import { typography as baseTypography } from './base';

export const fontFamily = 'Poppins';

const typography = reduce(baseTypography, (acc, typoObj, key) => {
  acc[key] = { ...typoObj, margin: 0, fontFamily };
  return acc;
}, {});

export default { ...typography };
