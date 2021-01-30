import React, { useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
} from 'react-redux-firebase';
import firebase from 'firebase';
/* eslint-disable camelcase */
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
/* eslint-enable camelcase */

import AppNavigator from './AppNavigator';
import cacheAssetsAsync from './config/cacheAssetsAsync';

import reducer from './reducers';

console.disableYellowBox = true;

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // eslint-disable-line no-underscore-dangle
);

const fbConfig = {
  apiKey: 'AIzaSyB-GZRTijpgwi3lKtIaiwbkDy9DUyWZfjU',
  authDomain: 'granny-squares.firebaseapp.com',
  projectId: 'granny-squares',
  storageBucket: 'granny-squares.appspot.com',
  messagingSenderId: '35690673249',
  appId: '1:35690673249:web:0976a4cea98eeaba52e620',
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
};

// Initialize firebase instance
firebase.initializeApp(fbConfig);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
};

function App() {
  const [isReady, setIsReady] = React.useState(false);
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
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
