import immutable from 'immutable';
import { SET_ADDRESSES, CLEAR_ADDRESSES } from '../actions/address';

export default (state = new immutable.Map(), action = {}) => {
  switch (action.type) {
    case SET_ADDRESSES:
      return immutable.fromJS(action.data);
    case CLEAR_ADDRESSES:
      return new immutable.Map();
    default:
      return state;
  }
};
