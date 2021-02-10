import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ProjectHeaderIcons from './components/ProjectHeaderIcons';

import HomeScreen from './screens/HomeScreen';
import ProjectScreen from './screens/ProjectScreen';
import EditProjectScreen from './screens/EditProjectScreen';
import QuiltViewScreen from './screens/QuiltViewScreen';
import AccountScreen from './screens/AccountScreen';

import { colors, navigationTheme } from './theme';

const Stack = createStackNavigator();

export default function RootAppNavigator() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,

          },
          headerTintColor: colors.invertedText,
          headerTitleStyle: {
            alignSelf: 'center',
            fontFamily: 'Poppins_500Medium', //
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{

          }}
        />
        <Stack.Screen
          name="Account"
          component={AccountScreen}
          options={{
            title: 'Account',
          }}
        />
        <Stack.Screen
          name="Project"
          component={ProjectScreen}
          options={({ route }) => ({
            title: route.params.title,
            headerRight: () => (
              <ProjectHeaderIcons projectId={route.params.projectId} />
            ),
          }
          )}

        />
        <Stack.Screen
          name="EditProject"
          component={EditProjectScreen}
          options={({ route }) => ({
            title: route.params.new ? 'Add Project' : 'Edit Project',
          })}
        />
        <Stack.Screen
          name="QuiltView"
          component={QuiltViewScreen}
          options={{
            title: 'Quilt View',
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
