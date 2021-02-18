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
  get, map, size,
} from 'lodash';

import IconButton from '../components/IconButton';
import ProjectListItem from '../components/ProjectListItem';
import { gutter, styles as themeStyles } from '../theme';

function HomeScreen() {
  const uid = useSelector((state) => get(state, 'firebase.auth.uid'));
  useFirebaseConnect(`projects/${uid}`);
  const projects = useSelector((state) => get(state, `firebase.data.projects.${uid}`, {}));
  const navigation = useNavigation();

  return (
    <SafeAreaView style={themeStyles.screenContainer}>
      <ScrollView
        contentContainerStyle={themeStyles.scrollContainer}
        style={{ width: '100%' }}
      >
        {
          size(projects)
            ? map(projects, (project, projectId) => (
              <ProjectListItem
                key={`project-list-item-${projectId}`}
                name={project.name}
                projectId={projectId}
              />
            ))
            : <View><Text>No projects</Text></View>
        }
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
