import React from 'react';
import { useSelector } from 'react-redux';
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  View,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  get, map, size,
} from 'lodash';

import IconButton from '../components/IconButton';
import ProjectListItem from '../components/ProjectListItem';
import { gutter, colors as themeColors, styles as themeStyles } from '../theme';

function HomeScreen() {
  const uid = useSelector((state) => get(state, 'firebase.auth.uid'));
  useFirebaseConnect(`projects/${uid}`);
  const projects = useSelector((state) => get(state, `firebase.data.projects.${uid}`));
  const navigation = useNavigation();

  const projectsLoading = !isLoaded(projects);

  let renderProjects;
  if (projectsLoading) {
    renderProjects = (
      <View style={themeStyles.card}>
        <ActivityIndicator size="large" color={themeColors.accent2} />
      </View>
    );
  } else if (size(projects)) {
    renderProjects = (map(projects, (project, projectId) => (
      <ProjectListItem
        key={`project-list-item-${projectId}`}
        name={project.name}
        projectId={projectId}
      />
    )));
  } else {
    renderProjects = (<View><Text>No projects</Text></View>);
  }

  return (
    <SafeAreaView style={themeStyles.screenContainer}>
      <ScrollView
        contentContainerStyle={themeStyles.scrollContainer}
        style={{ width: '100%' }}
      >
        {renderProjects}
        <View style={styles.iconButtonWrapper}>
          <IconButton
            level="1"
            onPress={() => navigation.navigate('EditProject', { new: true })}
            size="medium"
            name="plus"
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = {
  iconButtonWrapper: {
    width: '100%',
    padding: gutter,
    flexDirection: 'row',
    justifyContent: 'center',
  },
};

export default (HomeScreen);
