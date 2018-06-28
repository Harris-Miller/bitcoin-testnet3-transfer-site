import React, { Component } from 'react';

class Address extends Component {
  render() {
    const { match } = this.props;

    return (
      <div>
        <h1>Address</h1>
        <h3>{match.params.address}</h3>
      </div>
    );
  }
}

export default Address;
