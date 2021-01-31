import React from 'react';
import { useSelector } from 'react-redux';
import { useFirebaseConnect } from 'react-redux-firebase';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  get, map, sortBy, size,
} from 'lodash';

import IconButton from '../components/IconButton';
import ProjectListItem from '../components/ProjectListItem';
import { uid } from '../constants';
import { colors, styles as themeStyles, halfGutter } from '../theme';

function HomeScreen() {
  useFirebaseConnect(`projects/${uid}`);
  const projects = useSelector((state) => get(state, `firebase.data.projects.${uid}`, {}));
  const navigation = useNavigation();

  console.log('lzz projects', projects);

  return (
    <SafeAreaView style={themeStyles.screenContainer}>
      <ScrollView
        contentContainerStyle={styles.listContainer}
        style={{ width: '100%' }}
      >
        {
          size(projects)
            ? map(sortBy(projects, 'updatedAt'), (project, projectId) => (
              <ProjectListItem
                key={`project-list-item-${projectId}`}
                name={project.name}
                projectId={projectId}
              />
            ))
            : <View><Text>No projects</Text></View>
        }
      </ScrollView>
      <IconButton
        level="1"
        onPress={() => navigation.navigate('EditProject', { new: true })}
        size="medium"
        name="plus"
      />
    </SafeAreaView>
  );
}
const styles = {
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  listContainer: {
    width: '100%',
    margin: 'auto',
    padding: halfGutter,
  },
};

export default (HomeScreen);
