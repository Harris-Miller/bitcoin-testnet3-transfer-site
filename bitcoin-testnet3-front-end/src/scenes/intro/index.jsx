import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import logo from './logo.svg';
import './index.css';

class Intro extends Component {
  getUsers = () => {
    axios.get('http://localhost:3000/api/users')
      .then(res => {
        console.log(res);
      });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Link to="/not-found">Link to not-found</Link>
        <Button onClick={this.getUsers}>Get Users</Button>
      </div>
    );
  }
}

export default Intro;
