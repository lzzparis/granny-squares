import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal as ReactNativeModal,
  Text,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';

import Button from './Button';
import {
  halfGutter, gutter, colors, styles as themeStyles,
} from '../theme';

function Modal({
  children,
  onRequestClose,
  onSave,
  showCancel,
  title,
  visible,
}) {
  const saveAndClose = (e) => {
    e.preventDefault();
    onSave();
    onRequestClose();
  };
  const close = (e) => {
    e.preventDefault();
    onRequestClose();
  };
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
            color={colors.accent3}
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
        <View style={styles.footer}>
          {onSave && (
            <Button
              style={styles.button}
              title="Save"
              onPress={saveAndClose}
            />
          )}
          {showCancel && (
            <Button
              style={styles.button}
              title="Cancel"
              onPress={close}
              type="outline"
            />
          )}
        </View>
      </View>
    </ReactNativeModal>
  );
}

const styles = {
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  header: {
    width: '100%',
    paddingTop: halfGutter,
    paddingBottom: halfGutter,
    paddingLeft: gutter,
    paddingRight: gutter,
    backgroundColor: colors.accent3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footer: {
    width: '100%',
    padding: gutter,
    flexDirection: 'row-reverse',
  },
  button: {
    alignSelf: 'flex-start',
  },
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool.isRequired,
  onSave: PropTypes.func,
  onRequestClose: PropTypes.func.isRequired,
  showCancel: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

export default Modal;
