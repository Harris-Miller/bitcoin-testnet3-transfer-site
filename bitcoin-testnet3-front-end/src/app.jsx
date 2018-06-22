import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import store from './store';
import ResponsiveDrawer from './components/responsive-drawer'
import Intro from './scenes/intro';
import NotFound from './scenes/not-found';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Fragment>
          <CssBaseline />
          <Router>
            <ResponsiveDrawer>
              <Switch>
                <Route exact path="/" component={Intro} />
                <Route component={NotFound} />
              </Switch>
            </ResponsiveDrawer>
          </Router>
        </Fragment>
      </Provider>
    );
  }
}

export default App;
