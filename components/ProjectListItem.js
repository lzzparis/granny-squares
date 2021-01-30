import React from 'react';
import {
  Pressable,
  View,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

import { colors } from '../theme';
import { halfGutter } from '../utils';

function ProjectListItem({ name, projectId }) {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate('Project', { title: name, projectId })}>
      <View style={styles.container}>
        <Text style={styles.text}>
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
  text: {
    color: colors.text,
    fontFamily: 'Poppins_400Regular',
    fontSize: 18,
  },
};

export default ProjectListItem;
