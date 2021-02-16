import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import ReactNativeModal from 'react-native-modal';

import Button from './Button';
import {
  halfGutter,
  gutter,
  colors as themeColors,
  styles as themeStyles,
} from '../theme';

function Modal({
  title,
  visible,
  onConfirm,
  confirmLabel = 'No label',
  onRequestClose,
  showCancel,
  children,
  isDestructive,
}) {
  const saveAndClose = async (e) => {
    e.preventDefault();
    onConfirm();
    onRequestClose();
  };
  const close = (e) => {
    e.preventDefault();
    onRequestClose();
  };
  const headerColor = isDestructive ? themeColors.warn : themeColors.accent3;
  return (
    <ReactNativeModal
      isVisible={visible}
      onRequestClose={onRequestClose}
      avoidKeyboard
      onBackButtonPress={close}
      onBackdropPress={close}
    >
      <View style={styles.container}>
        <View style={{ ...styles.header, backgroundColor: headerColor }}>
          <Icon
            name="times"
            type="font-awesome-5"
            size={32}
            color={headerColor}
          />
          <Text style={themeStyles.h1}>{title}</Text>
          <Icon
            name="times"
            type="font-awesome-5"
            size={32}
            color={themeColors.invertedText}
            onPress={onRequestClose}
          />
        </View>
        <View style={styles.content}>
          {children}
        </View>
        <View style={styles.footer}>
          {onConfirm && (
            <Button
              level={isDestructive && 'destructive'}
              style={styles.button}
              title={confirmLabel}
              onPress={saveAndClose}
              size="small"
              addMargin
            />
          )}
          {showCancel && (
            <Button
              level={isDestructive && 'destructive'}
              style={styles.button}
              title="Cancel"
              onPress={close}
              type="outline"
              size="small"
            />
          )}
        </View>
      </View>
    </ReactNativeModal>
  );
}

const styles = {
  container: {
    backgroundColor: themeColors.paper,
    justifyContent: 'space-between',
    ...themeStyles.roundedCorners,
  },
  header: {
    width: '100%',
    paddingVertical: halfGutter,
    paddingHorizontal: gutter,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...themeStyles.roundedCorners,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  content: {
    padding: gutter,
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
  onConfirm: PropTypes.func,
  onRequestClose: PropTypes.func.isRequired,
  confirmLabel: PropTypes.string,
  showCancel: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

export default Modal;
