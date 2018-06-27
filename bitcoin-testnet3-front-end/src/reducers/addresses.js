import immutable from 'immutable';

export default (state = new immutable.List(), action = {}) => {
  switch (action.type) {
    default:
      return state;
  }
};
