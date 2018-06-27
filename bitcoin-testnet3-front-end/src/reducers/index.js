import { combineReducers } from 'redux';
import auth from './auth';
import addresses from './addresses';

export default combineReducers({
  auth,
  addresses
});
