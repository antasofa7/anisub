import {combineReducers} from 'redux';
import AuthReducer from './auth';
import WatchListReducer from './watchlist';

const rootReducer = combineReducers({
  AuthReducer,
  WatchListReducer,
});

export default rootReducer;
