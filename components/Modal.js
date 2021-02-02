import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal as ReactNativeModal,
  Text,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';

import {
  halfGutter, gutter, colors, styles as themeStyles,
} from '../theme';

function Modal({
  children,
  onRequestClose,
  title,
  visible,
}) {
  return (
    <ReactNativeModal
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon
            name="times"
            type="font-awesome-5"
            size={32}
            color={colors.accent2}
          />
          <Text style={themeStyles.h1}>{title}</Text>
          <Icon
            name="times"
            type="font-awesome-5"
            size={32}
            color={colors.invertedText}
            onPress={onRequestClose}
          />
        </View>
        {children}
      </View>
    </ReactNativeModal>
  );
}

const styles = {
  container: {
    width: '100%',
    height: '100%',
  },
  header: {
    width: '100%',
    paddingTop: halfGutter,
    paddingBottom: halfGutter,
    paddingLeft: gutter,
    paddingRight: gutter,
    backgroundColor: colors.accent2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Modal;
