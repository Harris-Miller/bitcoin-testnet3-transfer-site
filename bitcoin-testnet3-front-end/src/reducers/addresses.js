import immutable from 'immutable';
import { SET_ADDRESSES, CLEAR_ADDRESSES, SET_TRANSACTION, ADD_ADDRESSES } from '../actions/address';

export default (state = new immutable.Map(), action = {}) => {
  switch (action.type) {
    case ADD_ADDRESSES:
      return Object.keys(action.data).reduce((map, key) => {
        return map.set(key, new immutable.Map(action.data[key]));
      }, state);
    case SET_ADDRESSES:
      return immutable.fromJS(action.data);
    case CLEAR_ADDRESSES:
      return new immutable.Map();
    case SET_TRANSACTION:
      // this if statement is beacuse we only want to update a current user's address'
      // and not just some random one that comes in over the socket
      if (state.has(action.data.address)) {
        return state.setIn([action.data.address, 'txs', action.data.txs.hash], new immutable.Map(action.data.txs));
      }

      return state;
    default:
      return state;
  }
};
