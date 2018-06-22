import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import './index.css';

const Intro = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
    </header>
    <p className="App-intro">
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>
    <Link to="/not-found">Link to not-found</Link>
  </div>
);

export default Intro;
