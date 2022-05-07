import {
  GET_RECENT_SEARCH,
  SAVE_SEARCH_RESULTS,
} from '../../actions/searchResultsAction';

const initialState = {
  searchResultsListLoading: false,
  searchResultsListResults: false,
  searchResultsListError: false,

  getRecentSearchLoading: false,
  getRecentSearchResults: false,
  getRecentSearchError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SAVE_SEARCH_RESULTS:
      return {
        ...state,
        searchResultsListLoading: action.payload.loading,
        searchResultsListResults: action.payload.data,
        searchResultsListError: action.payload.errorMessage,
      };

    case GET_RECENT_SEARCH:
      return {
        ...state,
        getRecentSearchLoading: action.payload.loading,
        getRecentSearchResults: action.payload.data,
        getRecentSearchError: action.payload.errorMessage,
      };

    default:
      return state;
  }
}
