import { Dimensions } from 'react-native';
import PasswordValidator from 'password-validator';
import { gutter } from '../theme';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const getGridItemWidth = (columns) => (windowWidth - (4 * gutter)) / columns;

// Password Validator schema
export const passwordSchema = new PasswordValidator();
passwordSchema
  .is().min(6)
  .is().max(32);

export default {
  getGridItemWidth,
  windowHeight,
  windowWidth,
  passwordSchema,
};
