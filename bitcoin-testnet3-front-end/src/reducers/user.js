import immutable from 'immutable';
import { SET_CURRENT_USER } from '../actions/auth';

export default (state = new immutable.Map(), action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return state.set('currentUser', action.user);
    default:
      return state;
  }
};
