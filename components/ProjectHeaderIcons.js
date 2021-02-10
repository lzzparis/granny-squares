import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import { styles as themeStyles } from '../theme';

function ProjectHeaderIcons({ projectId }) {
  const navigation = useNavigation();
  return (
    <View style={{ flexDirection: 'row' }}>
      <Icon
        name="edit"
        type="font-awesome-5"
        size={24}
        iconStyle={themeStyles.headerIcon}
        onPress={() => navigation.navigate('EditProject', { projectId })}
      />
      <Icon
        name="th"
        type="font-awesome-5"
        size={24}
        iconStyle={themeStyles.headerIcon}
        onPress={() => navigation.navigate('QuiltView', { projectId })}
      />
    </View>

  );
}

export default ProjectHeaderIcons;
