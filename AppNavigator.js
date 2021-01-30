import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import AccountScreen from './screens/AccountScreen';
import TrackerScreen from './screens/TrackerScreen';
import TrackerEditScreen from './screens/TrackerEditScreen';

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
          name="Tracker"
          component={TrackerScreen}
          options={({ route }) => ({
            title: route.params.title,
          })}
        />
        <Stack.Screen
          name="TrackerEdit"
          component={TrackerEditScreen}
          options={{
            title: 'Edit',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
