import baseStyles, { styles } from './base';
import typography from './typography';

export default {
  ...baseStyles,
  styles: {
    ...styles,
    ...typography,
    textInput: {
      ...styles.textInput,
      ...typography.p,
    },
  },
  ...typography,
};
