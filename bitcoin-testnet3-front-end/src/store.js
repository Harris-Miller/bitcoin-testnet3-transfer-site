import immutable from 'immutable';
import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise';
import reducers from './reducers';
import { getAddresses, clearAddresses } from './actions/address';
import { fetchBpiCurrentUsd, setBpi } from './actions/bpi';

/* eslint-disable no-underscore-dangle */
// found if we don't do this, it breaks when redux extension not installed
// important for mobile
const composed = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ? compose(applyMiddleware(promiseMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  : applyMiddleware(promiseMiddleware);
/* eslint-enable no-underscore-dangle */

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

function fetchAndSetBpiForUsd() {
  fetchBpiCurrentUsd().then(data => store.dispatch(setBpi(data)));
}

// run immediately
fetchAndSetBpiForUsd();
// and update every 2 minutes
setInterval(fetchAndSetBpiForUsd, (1000 * 60 * 2));

export default store;
