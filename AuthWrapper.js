import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import * as actions from './actions';

class AuthWrapper extends Component {
  componentDidMount() {
    const { authenticate } = this.props;

    const firebaseConfig = {
      apiKey: 'AIzaSyAoqRifbq84AWoohA43KPadmJHUalGGPPc',
      authDomain: 'diary-832a3.firebaseapp.com',
      projectId: 'diary-832a3',
      storageBucket: 'diary-832a3.appspot.com',
      messagingSenderId: '634470948172',
      appId: '1:634470948172:web:0abd55b635aef0c307c3e9',
    };

    if (!window.firebaseApp) {
      window.firebaseApp = firebase.initializeApp(firebaseConfig);
    }

    window.db = window.firebaseApp.database();

    window.firebaseApp
      .auth()
      .signInAnonymously()
      .catch((error) => {
        console.error('Error', JSON.stringify(error));
      });

    window.firebaseApp.auth().onAuthStateChanged(async (auth) => {
      if (auth) {
        const { uid } = auth;
        const userSnap = await window.db.ref(`users/${uid}/createdAt`).once('value');

        const user = userSnap.val();
        if (!user) {
          window.db.ref(`users/${uid}/createdAt`).set(firebase.database.ServerValue.TIMESTAMP);
        }

        window.db.ref(`users/${uid}`).on('value', (snap) => {
          const data = snap.val();

          // Redux action
          authenticate({
            auth,
            data,
          });
        });
      }
    });
  }

  render() {
    const {
      children,
    } = this.props;
    return <>{children}</>;
  }
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  authenticate: actions.authenticate,
  unauthenticate: actions.unauthenticate,
};

AuthWrapper.propTypes = {
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthWrapper);
