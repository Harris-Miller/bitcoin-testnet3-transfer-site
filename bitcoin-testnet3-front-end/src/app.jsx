import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import store from './store';
import './socket-io';
import Wrapper from './scenes/wrapper';
import Intro from './scenes/intro';
import Address from './scenes/address';
import NotFound from './scenes/not-found';
import AuthenticatedRoute from './components/authenticated-route';
import { setCurrentUser } from './actions/auth';

const jwtToken = localStorage.getItem('jwtToken');

// if item does not exist in localStorage, it returns string null, wtf!
if (jwtToken && jwtToken !== 'null') {
  store.dispatch(setCurrentUser(jwtToken));
}

const App = () => (
  <Provider store={store}>
    <Fragment>
      <CssBaseline />
      <Router>
        <Wrapper>
          <Switch>
            <Route exact path="/" component={Intro} />
            <AuthenticatedRoute path="/address/:address" component={Address} />
            <Route component={NotFound} />
          </Switch>
        </Wrapper>
      </Router>
    </Fragment>
  </Provider>
);

export default App;
