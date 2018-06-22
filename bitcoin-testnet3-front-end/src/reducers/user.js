import immutable from 'immutable';

export default (state = new immutable.Map(), action) => {
  switch (action.type) {
    default:
      return state;
  }
};
