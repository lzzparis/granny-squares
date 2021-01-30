import React from 'react';
import {
  Pressable,
  View,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme';
import { halfGutter } from '../utils';

function ProjectListItem({ name, projectId }) {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate('Project', { title: name, projectId })}>
      <View style={styles.container}>
        <Text style={styles.text}>
          {name}
          {' '}
          -&gt;
        </Text>
      </View>
    </Pressable>
  );
}

const styles = {
  container: {
    width: '100%',
    margin: halfGutter,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default ProjectListItem;
