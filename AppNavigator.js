import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import ProjectScreen from './screens/ProjectScreen';
import EditProjectScreen from './screens/EditProjectScreen';
import QuickStartScreen from './screens/QuickStartScreen';
import AccountScreen from './screens/AccountScreen';

import { colors } from './theme';

const Stack = createStackNavigator();

export default function RootAppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,

          },
          headerTitleStyle: {
            alignSelf: 'center',
            color: colors.invertedText,
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
          })}
        />
        <Stack.Screen
          name="EditProject"
          component={EditProjectScreen}
          options={({ route }) => ({
            title: route.params.new ? 'Add Project' : 'Edit Project',
          })}
        />
        <Stack.Screen
          name="QuickStart"
          component={QuickStartScreen}
          options={{
            title: 'Quick Start',
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
