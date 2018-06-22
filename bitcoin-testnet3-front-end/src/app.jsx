import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import store from './store';
import Intro from './scenes/intro';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Fragment>
          <CssBaseline />
          <Router>
            <Route extact path="/" component={Intro} />
          </Router>
        </Fragment>
      </Provider>
    );
  }
}

export default App;
