import React from 'react';
import classes from './DotLoader.module.scss';
import theme from '../../theme';

const { colors: themeColors } = theme;

function DotLoader() {
  return (
    <div>
      <div className={classes.dotContainer}>
        <div className={classes.dot1} style={{ backgroundColor: themeColors.accent2 }} />
      </div>
      <div className={classes.dotContainer}>
        <div className={classes.dot2} style={{ backgroundColor: themeColors.accent3 }} />
      </div>
      <div className={classes.dotContainer}>
        <div className={classes.dot3} style={{ backgroundColor: themeColors.accent4 }} />
      </div>
    </div>
  );
}

export default DotLoader;
