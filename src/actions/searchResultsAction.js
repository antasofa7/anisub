import FIREBASE from '../config/firebase';
import {dispatchLoading, dispatchSuccess, dispatchError} from '../utils';

export const SAVE_SEARCH_RESULTS = 'SAVE_SEARCH_RESULTS';
export const GET_RECENT_SEARCH = 'GET_RECENT_SEARCH';

export const saveSearchResults = data => {
  return dispatch => {
    dispatchLoading(dispatch, SAVE_SEARCH_RESULTS);

    const searchResults = {
      ...data,
    };

    FIREBASE.database()
      .ref(`searchResults/${data.uid}`)
      .child(data.animeId)
      .set(searchResults)
      .then(res => {
        if (res) {
          dispatchSuccess(dispatch, SAVE_SEARCH_RESULTS, res ? res : []);
        }
      })
      .catch(err => {
        dispatchError(dispatch, SAVE_SEARCH_RESULTS, err.message);
      });
  };
};

export const getRecentSearch = uid => {
  console.log('uid', uid);
  return dispatch => {
    dispatchLoading(dispatch, GET_RECENT_SEARCH);

    FIREBASE.database()
      .ref(`searchResults/${uid}`)
      .once('value', snapshot => {
        console.log('snapshot', snapshot);
        let data = snapshot.val();
        dispatchSuccess(dispatch, GET_RECENT_SEARCH, data ? data : []);
      })
      .catch(err => {
        dispatchError(dispatch, GET_RECENT_SEARCH, err.message);
      });
  };
};
