import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { Icon } from 'react-native-elements';

import PlaceholderIcon from './components/PlaceholderIcon';
import ProjectHeaderIcons from './components/ProjectHeaderIcons';

import AccountScreen from './screens/AccountScreen';
import EditProjectScreen from './screens/EditProjectScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProjectScreen from './screens/ProjectScreen';
// import QuiltViewScreen from './screens/QuiltViewScreen';

import { colors as themeColors, styles as themeStyles } from './theme';

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: themeColors.primary,
    background: themeColors.background,
    card: themeColors.paper,
    text: themeColors.text,
    border: themeColors.border,
    notification: themeColors.accent1,
  },
};

const Stack = createStackNavigator();

export default function RootAppNavigator() {
  useFirebaseConnect('auth');
  const auth = useSelector((state) => state.firebase.auth);

  const isLoggedIn = isLoaded(auth) && !isEmpty(auth);
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: themeColors.primary,

          },
          headerTintColor: themeColors.invertedText,
          headerTitleStyle: {
            alignSelf: 'center',
            fontFamily: 'Poppins_500Medium', //
          },
        }}
      >
        {!isLoggedIn
          ? (
            <>
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPasswordScreen}
                options={{
                  headerStyle: { backgroundColor: themeColors.primary, elevation: 0, zIndex: 0 },
                  title: '',
                }}
              />
            </>
          )
          : (
            <>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={({ navigation }) => ({
                  headerLeft: () => (
                    <PlaceholderIcon />
                  ),
                  headerRight: () => (
                    <Icon
                      onPress={() => navigation.navigate('Account')}
                      name="user-circle"
                      type="font-awesome-5"
                      size={24}
                      iconStyle={themeStyles.headerIcon}
                    />
                  ),
                })}
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
                  headerRight: () => (
                    <PlaceholderIcon />
                  ),
                })}
              />
              {
                /*
                  <Stack.Screen
                    name="QuiltView"
                    component={QuiltViewScreen}
                    options={{
                      title: 'Quilt View',
                    }}
                  />
                */
              }
              <Stack.Screen
                name="Account"
                component={AccountScreen}
                options={{
                  title: 'Account',
                  headerRight: () => (
                    <PlaceholderIcon />
                  ),
                }}
              />
            </>
          )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
