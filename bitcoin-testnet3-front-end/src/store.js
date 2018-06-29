import immutable from 'immutable';
import { createStore, applyMiddleware, compose } from 'redux';
// import logger from 'redux-logger';
import promiseMiddleware from 'redux-promise';
import reducers from './reducers';
import { getAddresses, clearAddresses } from './actions/address';

// found if we don't do this, it breaks when redux extension not installed
// important for mobile
const composed = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ? compose(applyMiddleware(/*logger, */promiseMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  : applyMiddleware(/*logger, */promiseMiddleware);

const store = createStore(
  reducers,
  composed
);

let currentUser;

store.subscribe(() => {
  const previousUser = currentUser;
  currentUser = store.getState().auth.get('user');

  if (!immutable.is(previousUser, currentUser)) {
    if (currentUser) {
      store.dispatch(getAddresses(currentUser.get('id')));
    } else {
      store.dispatch(clearAddresses());
    }
  }
});

export default store;
