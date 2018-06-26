import immutable from 'immutable';
import { SET_CURRENT_USER } from '../actions/auth';

const initialState = {
  isAuthenticated: false,
  user: null
};

export default (state = new immutable.Map(initialState), action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return state.set('isAuthenticated', !action.user).set('currentUser', action.user);
    default:
      return state;
  }
};
