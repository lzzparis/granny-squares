import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import user from './user';

export default combineReducers({
  user,
  firebase: firebaseReducer,
});
