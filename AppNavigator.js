import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import TrackerScreen from './screens/TrackerScreen';
import TrackerEditScreen from './screens/TrackerEditScreen';
import AccountScreen from './screens/AccountScreen';

import { colors } from './theme';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptions = {
  headerStyle: {
    backgroundColor: colors.primary,

  },
  headerTitleStyle: {
    alignSelf: 'center',
    color: colors.invertedText,
    fontFamily: 'Poppins_500Medium', //
  },
};

function HomeScreenStack() {
  return (
    <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{
        title: 'Home',
      }}
    />
  );
}

function TrackerScreenStack() {
  return (
    <Stack.Screen
      name="TrackerScreen"
      component={TrackerScreen}
      options={{
        title: 'Trackerurator',
      }}
    />
  );
}

function TrackerEditScreenStack() {
  return (
    <Stack.Screen
      name="TrackerEditScreen"
      component={TrackerEditScreen}
      options={{
        title: 'TrackerEdit',
      }}
    />
  );
}

function AccountScreenStack() {
  return (
    <Stack.Screen
      name="AccountScreen"
      component={AccountScreen}
      options={{
        title: 'Account',
      }}
    />
  );
}

function Home() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen" screenOptions={screenOptions}>
      {HomeScreenStack()}
    </Stack.Navigator>
  );
}
function Tracker() {
  return (
    <Stack.Navigator initialRouteName="TrackerScreen" screenOptions={screenOptions}>
      {TrackerScreenStack()}
    </Stack.Navigator>
  );
}
function TrackerEdit() {
  return (
    <Stack.Navigator initialRouteName="TrackerEditScreen" screenOptions={screenOptions}>
      {TrackerEditScreenStack()}
    </Stack.Navigator>
  );
}
function Account() {
  return (
    <Stack.Navigator initialRouteName="AccountScreen" screenOptions={screenOptions}>
      {AccountScreenStack()}
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        showLabel: true,
        showIcon: true,
        keyboardHidesTabBar: !(Platform.OS === 'ios'),
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome5
              name="home"
              size={20}
              color={focused ? color : color}
            />
          ),
          tabBarLabel: 'Home',
          title: 'Home',
        }}
      />
      <Tab.Screen
        name="Tracker"
        component={Tracker}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome5
              name="tools"
              size={20}
              color={focused ? color : color}
            />
          ),
          tabBarLabel: 'Tracker',
          title: 'Tracker',
        }}
      />
      <Tab.Screen
        name="TrackerEdit"
        component={TrackerEdit}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome5
              name="chart-line"
              size={20}
              color={focused ? color : color}
            />
          ),
          tabBarLabel: 'TrackerEdit',
          title: 'TrackerEdit',
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome5
              name="user-alt"
              size={20}
              color={focused ? color : color}
            />
          ),
          tabBarLabel: 'Account',
          title: 'Account',
        }}
      />
    </Tab.Navigator>
  );
}

TabNavigator.propTypes = {
};

export default function RootAppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="Navigator">
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
