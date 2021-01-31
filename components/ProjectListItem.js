import React from 'react';
import PropTypes from 'prop-types';
import {
  Pressable,
  View,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

import { colors, halfGutter, styles as themeStyles } from '../theme';

function ProjectListItem({ name, projectId }) {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate('Project', { title: name, projectId })}>
      <View style={styles.container}>
        <Text style={themeStyles.h3}>
          {name}
        </Text>
        <Icon
          color={colors.text}
          name="arrow-right"
          size={16}
          type="font-awesome-5"
        />

      </View>
    </Pressable>
  );
}

ProjectListItem.propTypes = {
  name: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired,
};

const styles = {
  container: {
    width: 'auto',
    margin: halfGutter,
    paddingLeft: halfGutter,
    paddingRight: halfGutter,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.paper,
    borderRadius: 8,

  },
};

export default ProjectListItem;