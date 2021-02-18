import React from 'react';
import { useFirebase } from 'react-redux-firebase';

function AuthWrapper(children) {
  return (<>{children}</>);
}

export default AuthWrapper;
