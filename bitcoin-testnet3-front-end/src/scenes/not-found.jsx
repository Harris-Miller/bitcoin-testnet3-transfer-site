/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import './not-found.css';

const NotFound = ({ location }) => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">404 Not Found!</h1>
    </header>
    <p className="App-intro">
      The resource &#34;{location.pathname}&#34; was not found;
    </p>
    <Link to="/">Home</Link>
  </div>
);

NotFound.propTypes = {
  location: PropTypes.shape().isRequired
};

export default NotFound;
