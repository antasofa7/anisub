import {
  ADD_TO_WATCH_LIST,
  DELETE_WATCH_LIST,
  GET_WATCH_LIST,
} from '../../actions/WatchListAction';

const initialState = {
  addToWatchListLoading: false,
  addToWatchListResults: false,
  addToWatchListError: false,

  getWatchListLoading: false,
  getWatchListResults: false,
  getWatchListError: false,

  deleteWatchListLoading: false,
  deleteWatchListResults: false,
  deleteWatchListError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TO_WATCH_LIST:
      return {
        ...state,
        addToWatchListLoading: action.payload.loading,
        addToWatchListResults: action.payload.data,
        addToWatchListError: action.payload.errorMessage,
      };

    case GET_WATCH_LIST:
      return {
        ...state,
        getWatchListLoading: action.payload.loading,
        getWatchListResults: action.payload.data,
        getWatchListError: action.payload.errorMessage,
      };

    case DELETE_WATCH_LIST:
      return {
        ...state,
        deleteWatchListLoading: action.payload.loading,
        deleteWatchListResults: action.payload.data,
        deleteWatchListError: action.payload.errorMessage,
      };

    default:
      return state;
  }
}
