import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import store from './store';
import Wrapper from './scenes/wrapper';
import Intro from './scenes/intro';
import Address from './scenes/address';
import NotFound from './scenes/not-found';
import { setCurrentUser } from './actions/auth';
import { getAddresses } from './actions/address';

const jwtToken = localStorage.getItem('jwtToken');

// if item does not exist in localStorage, it returns string null, wtf!
if (jwtToken && jwtToken !== 'null') {
  store.dispatch(setCurrentUser(jwtToken));
  store.dispatch(getAddresses(store.getState().auth.get('user').id));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Fragment>
          <CssBaseline />
          <Router>
            <Wrapper>
              <Switch>
                <Route exact path="/" component={Intro} />
                <Route path="/:address" component={Address} />
                <Route component={NotFound} />
              </Switch>
            </Wrapper>
          </Router>
        </Fragment>
      </Provider>
    );
  }
}

export default App;
