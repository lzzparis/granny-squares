import baseStyles, { styles } from './base';
import typography from './typography';

export default {
  ...baseStyles,
  styles: {
    ...styles,
    ...typography,
    textInput: {
      ...styles.textInput,
      width: '100%',
      borderStyle: 'none',
      borderBottomStyle: 'solid',
      boxSizing: 'border-box',
      ...typography.p,
    },
  },
  ...typography,
};
