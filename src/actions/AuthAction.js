import FIREBASE from '../config/firebase';
import {
  dispatchLoading,
  dispatchSuccess,
  dispatchError,
  storeData,
} from '../utils';

export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';

export const registerUser = data => {
  return dispatch => {
    dispatchLoading(dispatch, REGISTER_USER);

    FIREBASE.auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(success => {
        const newData = {
          ...data,
          uid: success.user.uid,
        };

        FIREBASE.database().ref(`users/${success.user.uid}`).set(newData);

        dispatchSuccess(dispatch, REGISTER_USER, newData);
      })
      .catch(err => {
        dispatchError(dispatch, REGISTER_USER, err.message);
      });
  };
};

export const loginUser = data => {
  return dispatch => {
    dispatchLoading(dispatch, LOGIN_USER);

    FIREBASE.auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(success => {
        FIREBASE.database()
          .ref(`users/${success.user.uid}`)
          .once('value')
          .then(resDB => {
            if (resDB.val()) {
              console.log('res', resDB.val());
              dispatchSuccess(dispatch, LOGIN_USER, resDB.val());

              storeData('user', resDB.val());
            } else {
              dispatchError(dispatch, LOGIN_USER, 'Email not registered');
            }
          });
      })
      .catch(err => {
        dispatchError(dispatch, LOGIN_USER, err.message);
      });
  };
};
