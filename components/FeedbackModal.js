import React, { useEffect } from 'react';
import {
  View,
  Modal,
  Text,
} from 'react-native';

import { Icon } from 'react-native-elements';

import { colors as themeColors, styles as themeStyles } from '../theme';

function FeedbackModal({ open, type, message }) {
  const color = type === 'success' ? themeColors.success : themeColors.error;
  return (
    <Modal visible={open} transparent>
      <View style={styles.container}>
        <View style={styles.widthRestricter}>
          <Icon
            name={type === 'success' ? 'check-circle' : 'times-circle'}
            color={color}
            size={100}
            type="font-awesome-5"
          />
          <Text style={{
            ...themeStyles.em, textAlign: 'center', fontSize: 20, color,
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
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${themeColors.lightBlack}AA`,
  },
  widthRestricter: {
    width: '60%',
  },
};

export default FeedbackModal;
