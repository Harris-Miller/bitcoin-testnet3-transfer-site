import { SET_BPI } from '../actions/bpi';

export default (state = {}, action = {}) => {
  switch(action.type) {
    case SET_BPI:
      return action.data;
    default:
      return state;
  }
};
