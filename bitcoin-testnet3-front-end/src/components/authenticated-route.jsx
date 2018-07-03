import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

class AuthenticatedRoute extends Component {
  render() {
    const { component: WrappedComponent, auth, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          auth.isAuthenticated
            ? (<WrappedComponent {...props} />)
            : (<Redirect to={{ pathname: '/', from: props.location }} />)
        }
      />
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth: auth.toJS() });

export default connect(mapStateToProps)(AuthenticatedRoute);