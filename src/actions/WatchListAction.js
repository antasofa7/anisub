import FIREBASE from '../config/firebase';
import {dispatchLoading, dispatchSuccess, dispatchError} from '../utils';

export const ADD_TO_WATCH_LIST = 'ADD_TO_WATCH_LIST';
export const GET_WATCH_LIST = 'GET_WATCH_LIST';
export const DELETE_WATCH_LIST = 'DELETE_WATCH_LIST';

export const addToWatchList = data => {
  return dispatch => {
    dispatchLoading(dispatch, ADD_TO_WATCH_LIST);

    const watchLists = {
      ...data,
    };

    FIREBASE.database()
      .ref(`watchLists/${data.uid}`)
      .child(data.animeId)
      .set(watchLists)
      .then(res => {
        if (res) {
          dispatchSuccess(dispatch, ADD_TO_WATCH_LIST, res ? res : []);
        }
      })
      .catch(err => {
        dispatchError(dispatch, ADD_TO_WATCH_LIST, err.message);
      });
  };
};

export const getWatchLists = uid => {
  console.log('uid', uid);
  return dispatch => {
    dispatchLoading(dispatch, GET_WATCH_LIST);

    FIREBASE.database()
      .ref(`watchLists/${uid}`)
      .once('value', snapshot => {
        let data = snapshot.val();
        dispatchSuccess(dispatch, GET_WATCH_LIST, data ? data : []);
      })
      .catch(err => {
        dispatchError(dispatch, GET_WATCH_LIST, err.message);
      });
  };
};

export const deleteWatchList = data => {
  return dispatch => {
    dispatchLoading(dispatch, DELETE_WATCH_LIST);

    FIREBASE.database()
      .ref(`watchLists/${data.uid}`)
      .child(data.animeId)
      .remove()
      .then(res => {
        dispatchSuccess(dispatch, DELETE_WATCH_LIST, res);
      })
      .catch(err => {
        dispatchError(dispatch, DELETE_WATCH_LIST, err.message);
      });
  };
};
