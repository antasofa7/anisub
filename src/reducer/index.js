import {combineReducers} from 'redux';
import AuthReducer from './auth';
import WatchListReducer from './watchlist';
import SearchResultReducer from './watchlist';

const rootReducer = combineReducers({
  AuthReducer,
  WatchListReducer,
  SearchResultReducer,
});

export default rootReducer;
