import React from 'react';
import { connect, useSelector } from 'react-redux';
import { useFirebaseConnect } from 'react-redux-firebase';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import {
  get, map, sortBy, size,
} from 'lodash';

import ProjectListItem from '../components/ProjectListItem';
import { uid } from '../constants';
import { colors } from '../theme';
import { halfGutter } from '../utils';

function HomeScreen() {
  useFirebaseConnect(`projects/${uid}`);
  const projects = useSelector((state) => get(state, 'firebase.data.projects', {}));
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.listContainer}
      >
        <Text>{JSON.stringify(projects, null, 2)}</Text>
        {
          // size(projects)
          //   ? map(sortBy(projects, 'updatedAt'), (project, projectId) => (
          //     <ProjectListItem name={project.name} projectId={projectId} />
          //   ))
          //   : <View><Text>No projects</Text></View>
        }
        <Icon
          color={colors.accent1}
          name="plus"
          onPress={() => navigation.navigate('EditProject', { new: true })}
          raised
          reverse
          size={32}
          type="font-awesome-5"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = {
  container: {},
  listContainer: {
    width: '100%',
    margin: 'auto',
    padding: halfGutter,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
};

export default (HomeScreen);
