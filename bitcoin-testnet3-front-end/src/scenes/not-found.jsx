import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import './not-found.css';

class NotFound extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">404 Not Found!</h1>
        </header>
        <p className="App-intro">
          The resource "{this.props.location.pathname}" was not found
        </p>
        <Link to="/">Home</Link>
      </div>
    );
  }
}

export default NotFound;
