import { combineReducers } from 'redux';
import auth from './auth';
import addresses from './addresses';
import bpi from './bpi';

export default combineReducers({
  auth,
  addresses,
  bpi
});
