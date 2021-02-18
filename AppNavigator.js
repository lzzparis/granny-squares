import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { Icon } from 'react-native-elements';

import ProjectHeaderIcons from './components/ProjectHeaderIcons';

import AccountScreen from './screens/AccountScreen';
import EditProjectScreen from './screens/EditProjectScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProjectScreen from './screens/ProjectScreen';
import QuiltViewScreen from './screens/QuiltViewScreen';

import { colors, navigationTheme, styles as themeStyles } from './theme';

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
                options={({ navigation }) => ({
                  headerLeft: () => (
                    <Icon
                      name="minus-circle"
                      type="font-awesome-5"
                      size={24}
                      iconStyle={{ ...themeStyles.headerIcon, color: colors.primary }}
                    />
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
                })}
              />
              <Stack.Screen
                name="QuiltView"
                component={QuiltViewScreen}
                options={{
                  title: 'Quilt View',
                }}
              />
              <Stack.Screen
                name="Account"
                component={AccountScreen}
                options={{
                  title: 'Account',
                }}
              />
            </>
          )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
