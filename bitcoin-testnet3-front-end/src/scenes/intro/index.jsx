import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const Intro = ({ auth }) => {
  const generalGreeting = (
    <Typography>Signup or Login to get started!</Typography>
  );

  const userGreeting = (
    <Fragment>
      <Typography>
        Welcome {auth.user && auth.user.username}.
        Use the add button on the bottom right of your screen to add an address to see current and future transactions.
        <br /><br />
        If you don&#39;t yet have a bit coin address, you can create one using the button on the bottom right of your screen.
        <br /><br />
        Once you have that address created, you can add funds to the account and watch them be automatically added!
        Click on the links on the left to see the transactions for your saved addresses (they will auto update!)
        <br /><br />
        A great way to test this out is to download this app on your phone: <a href="https://play.google.com/store/apps/details?id=de.schildbach.wallet_test&hl=en_US" target="_blank" rel="noopener noreferrer">https://play.google.com/store/apps/details?id=de.schildbach.wallet_test&hl=en_US</a>
        <br /><br />
        From that app, you can easily add funds to any address you have saved on this app. First though, you&#39;ll need to fund that app.
        <br /><br />
        ou can do that here: <a href="https://coinfaucet.eu/en/btc-testnet/" target="_blank" rel="noopener noreferrer">https://coinfaucet.eu/en/btc-testnet/</a>. Use that faucet to fund the addresses saved in this app as well. Give it a try!
      </Typography>
    </Fragment>
  );

  return (
    <Grid container>
      <Grid item xs={12} style={{ marginBottom: '16px' }}>
        <Typography variant="headline">Welcome to the bitcoin-testnet3-transaction-site</Typography>
      </Grid>
      <Grid item>
        {auth.isAuthenticated ? userGreeting : generalGreeting}
      </Grid>
    </Grid>
  );
};

Intro.propTypes = {
  auth: PropTypes.shape().isRequired
};

const mapStateToProps = ({ auth }) => ({ auth: auth.toJS() });

export default connect(mapStateToProps)(Intro);
