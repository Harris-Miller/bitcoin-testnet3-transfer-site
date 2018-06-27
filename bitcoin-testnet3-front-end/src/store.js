import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import promiseMiddleware from 'redux-promise';
import reducers from './reducers';

// found if we don't do this, it breaks when redux extension not installed
// important for mobile
const composed = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ? compose(applyMiddleware(logger, promiseMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  : applyMiddleware(logger, promiseMiddleware);

export default createStore(
  reducers,
  composed
);
