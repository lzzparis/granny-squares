import React, { useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import 'react-native-get-random-values';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {
  ReactReduxFirebaseProvider,
} from 'react-redux-firebase';
import firebase from 'firebase';
/* eslint-disable camelcase */
import {
  useFonts,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
/* eslint-enable camelcase */

import AppNavigator from './AppNavigator';
import cacheAssetsAsync from './config/cacheAssetsAsync';
import { firebaseConfig } from './config/firebase';

import reducer from './reducers';

console.disableYellowBox = true;

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // eslint-disable-line no-underscore-dangle
);
// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
};

function App() {
  const [isReady, setIsReady] = React.useState(false);
  const [fontsLoaded] = useFonts({
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!isReady || !fontsLoaded) {
    return (
      <AppLoading
        startAsync={cacheAssetsAsync}
        onFinish={() => setIsReady(true)}
        onError={window.log}
      />
    );
  }

  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <AppNavigator />
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
