import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
// import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// import Button from '@material-ui/core/Button';

class Intro extends Component {
  render() {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="headline">Welcome to the bitcoin-testnet3-transaction-site</Typography>
        </Grid>
        <Grid item>
          <Typography>To get started, please login or sign up!</Typography>
        </Grid>
      </Grid>
    );
  }
}

export default Intro;
