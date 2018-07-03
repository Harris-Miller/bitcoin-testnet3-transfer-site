import React, { Component, Fragment } from 'react';
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
      <Fragment>
        <Typography>
          Welcome {auth.user && auth.user.username}.
          Use the add button on the bottom right of your screen to add an address to see current and future transactions.
          <br /><br />
          If you don't yet have a bit coin address, you can create one by making a POST request to: <code>https://api.blockcypher.com/v1/btc/test3/addrs</code> (Use postman, or curl)
          From that response, copy the <code>address</code> field and use that value in the Button below.
          <br /><br />
          Once you have that address created, you can add funds to the account and watch them be automatically added!
          Click on the links on the right to see the transactions for your saved addresses (they will auto update!)
          <br /><br />
          A great way to test this out is to download this app on your phone: <a href="https://play.google.com/store/apps/details?id=de.schildbach.wallet_test&hl=en_US" target="_blank" rel="noopener noreferrer">https://play.google.com/store/apps/details?id=de.schildbach.wallet_test&hl=en_US</a>
          <br /><br />
          From that app, you can easily add funds to any address you have saved on this app. First though, you'll need to fund that app. You can do that here: <a href="https://testnet.manu.backend.hamburg/faucet" target="_blank" rel="noopener noreferrer">https://testnet.manu.backend.hamburg/faucet</a>
          <br /><br />
          You can use that faucet to fund the addresses saved in this app as well. Give it a try!
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
  }
}

const mapStateToProps = ({ auth }) => ({ auth: auth.toJS() });

export default connect(mapStateToProps)(Intro);
