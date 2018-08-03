import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const AuthenticatedRoute = ({ component: WrappedComponent, auth, location, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (auth.isAuthenticated
        ? (<WrappedComponent {...props} />)
        : (<Redirect to={{ pathname: '/', from: location }} />))
    }
  />
);

AuthenticatedRoute.propTypes = {
  component: PropTypes.element.isRequired,
  auth: PropTypes.shape().isRequired,
  location: PropTypes.string.isRequired
};

const mapStateToProps = ({ auth }) => ({ auth: auth.toJS() });

export default connect(mapStateToProps)(AuthenticatedRoute);
