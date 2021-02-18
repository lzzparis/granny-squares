import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

import ProjectHeaderIcons from './components/ProjectHeaderIcons';

import HomeScreen from './screens/HomeScreen';
import ProjectScreen from './screens/ProjectScreen';
import EditProjectScreen from './screens/EditProjectScreen';
import QuiltViewScreen from './screens/QuiltViewScreen';
import LoginScreen from './screens/LoginScreen';

import { colors, navigationTheme } from './theme';

const Stack = createStackNavigator();

export default function RootAppNavigator() {
  useFirebaseConnect('auth');
  const auth = useSelector((state) => state.firebase.auth);

  const isLoggedIn = isLoaded(auth) && !isEmpty(auth);
  console.log('lzz auth state', {
    auth, isLoaded: isLoaded(auth), isEmpty: isEmpty(auth), isLoggedIn,
  });
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        initialRouteName="Login"
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
        {!isLoggedIn
          ? (
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
          )
          : (
            <>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{

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
            </>
          )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
