import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class Intro extends Component {
  render() {
    const { auth } = this.props;

    const generalGreeting = (
      <Typography>Signup or Login to get started!</Typography>
    );

    const userGreeting = (
      <Typography>
        Welcome {auth.user.username}.
        Use the add button on the bottom right of your screen to add an address to see current and future transactions.
      </Typography>
    );
    
    return (
      <Grid container>
        <Grid item xs={12} style={{ 'margin-bottom': '16px' }}>
          <Typography variant="headline">Welcome to the bitcoin-testnet3-transaction-site</Typography>
        </Grid>
        <Grid item>
          {auth.isAuthenticated ? userGreeting : generalGreeting}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth: auth.toJS() });

export default connect(mapStateToProps)(Intro);
