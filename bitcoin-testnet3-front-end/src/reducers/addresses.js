import immutable from 'immutable';
import { RESET_ADDRESSES } from '../actions/address';

export default (state = {}, action = {}) => {
  switch (action.type) {
    case RESET_ADDRESSES:
      return action.data;
    default:
      return state;
  }
};
