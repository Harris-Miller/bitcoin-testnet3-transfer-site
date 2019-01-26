import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { withStyles } from '@material-ui/core/styles';
import TextInput from '../../components/text-input';
import { faucetAddress } from '../../actions/address';

const styles = () => ({
  root: {
    flexGrow: 1
  }
});

class FaucetDialog extends Component {
  static propTypes = {
    onClose: PropTypes.func,
    auth: PropTypes.shape().isRequired,
    classes: PropTypes.shape().isRequired,
    address: PropTypes.shape().isRequired
  };

  static defaultProps = {
    onClose: () => { }
  };

  state = {
    amount: ''
  };

  handleTextChange = name => ({ target }) => this.setState({ [name]: target.value });

  handleClose = () => {
    this.props.onClose();
  };

  faucet = () => {
    const { auth, address } = this.props;
    const userId = auth.user.id;
    const { amount } = this.state;

    if (amount) {
      faucetAddress(userId, address, amount)
        .then(() => {
          this.handleClose();
        })
        .catch(() => {
          alert('Failed to faucet'); // eslint-disable-line no-alert
        });
    }
  };

  render() {
    const { classes, address, ...rest } = this.props;

    return (
      <div>
        <Dialog
          onClose={this.handleClose}
          {...rest}
        >
          <DialogTitle>
            <Grid container justify="center" alignItems="center" className={classes.root}>
              <Grid item>
                Faucet bitcoins (in Satoshis)
              </Grid>
            </Grid>
          </DialogTitle>
          <DialogContent>
            <Grid container justify="center" alignItems="center" className={classes.root}>
              <Grid item xs={12}>
                <TextInput
                  id="faucet"
                  label="Amount to Faucet"
                  value={this.state.amount}
                  onChange={this.handleTextChange('amount')}
                />
              </Grid>
              <Grid item xs={12}>
                If you get an error, try this site:
                <br />
                <a href="https://coinfaucet.eu/en/btc-testnet/" target="_blank" rel="noopener noreferrer">https://coinfaucet.eu/en/btc-testnet/</a>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
            <Button onClick={this.faucet} color="primary">
              Faucet
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth: auth.toJS() });

export default connect(mapStateToProps)(withStyles(styles)(withMobileDialog()(FaucetDialog)));
