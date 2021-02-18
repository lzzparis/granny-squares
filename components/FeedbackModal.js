import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
} from 'react-native';
import Modal from 'react-native-modal';

import { Icon } from 'react-native-elements';

import { colors as themeColors, styles as themeStyles } from '../theme';

function FeedbackModal({ open, type, message }) {
  const color = type === 'success' ? themeColors.success : themeColors.error;
  return (
    <Modal
      isVisible={open}
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={400}
      backdropTransitionOutTiming={400}
    >
      <View style={styles.container}>
        <View style={styles.widthRestricter}>
          <Icon
            name={type === 'success' ? 'check-circle' : 'times-circle'}
            color={color}
            size={100}
            type="font-awesome-5"
          />
          <Text style={{
            ...themeStyles.strong, textAlign: 'center', fontSize: 20, color,
          }}
          >
            {message}
          </Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  widthRestricter: {
    width: '60%',
  },
};

FeedbackModal.propTypes = {
  open: PropTypes.bool,
  type: PropTypes.string,
  message: PropTypes.string,
};

export default FeedbackModal;
