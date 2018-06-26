import immutable from 'immutable';
import { SET_CURRENT_USER } from '../actions/auth';
import { REMOVE_CURRENT_USER } from '../actions/auth';

const initialState = {
  isAuthenticated: false
};

export default (state = new immutable.Map(initialState), action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return state.set('isAuthenticated', true).set('user', action.user);
    case REMOVE_CURRENT_USER:
      return state.set('isAuthenticated', false).remove('user')
    default:
      return state;
  }
};
