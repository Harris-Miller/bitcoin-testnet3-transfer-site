import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Tooltip from '@material-ui/core/Tooltip';
import SettingsOverscan from '@material-ui/icons/SettingsOverscan';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeAddress, getAddresses } from '../../actions/address';
import QRCodeDialog from './qr-code-dialog';
import RemoveConfirmationDialog from './remove-confirmation-dialog';
import BalanceDisplay from './balance-display';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  row: {
    marginBottom: '16px'
  }
});

class AddressTitle extends Component {
  static propTypes = {
    address: PropTypes.shape().isRequired,
    auth: PropTypes.shape().isRequired,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.shape().isRequired,
    classes: PropTypes.shape().isRequired
  };

  state = {
    qrDialogOpen: false,
    removeDialogOpen: false
  };

  removeAddress = () => {
    const { address, auth, dispatch, history } = this.props;
    const userId = auth.user.id;

    removeAddress(userId, address.address)
      .then(() => {
        dispatch(getAddresses(userId));
        history.push('/');
      });
  };

  render() {
    const { classes, address } = this.props;

    return (
      <Paper className={classes.root}>
        <Grid container justify="space-between" className={classes.row}>
          <Grid item xs={8}>
            <Typography variant="headline">
              Address: <Hidden smDown>{address.address}</Hidden>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Grid container justify="flex-end">
              <Grid item>
                <Tooltip title="Display QR Code">
                  <IconButton onClick={() => this.setState({ qrDialogOpen: true })}>
                    <SettingsOverscan />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Remove Address">
                  <IconButton onClick={() => this.setState({ removeDialogOpen: true })}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
          <Hidden mdUp>
            <Grid item xs={12}>
              <Typography varient="subheader">{address.address}</Typography>
            </Grid>
          </Hidden>
        </Grid>
        <Grid container className={classes.row}>
          <Grid item xs={12} md={4}>
            <BalanceDisplay text="Balance" value={address.balance} />
          </Grid>
          <Grid item xs={12} md={4}>
            <BalanceDisplay text="Unconfirmed Balance" value={address.unconfirmed_balance} />
          </Grid>
          <Grid item xs={12} md={4}>
            <BalanceDisplay text="Final Balance" value={address.final_balance} />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <Typography>Transactions: {Object.keys(address.txs).length}</Typography>
          </Grid>
        </Grid>
        <QRCodeDialog open={this.state.qrDialogOpen} address={address.address} onClose={() => this.setState({ qrDialogOpen: false })} />
        <RemoveConfirmationDialog
          open={this.state.removeDialogOpen}
          onClose={() => this.setState({ removeDialogOpen: false })}
          onConfirm={this.removeAddress}
        />
      </Paper>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth: auth.toJS() });

export default connect(mapStateToProps)(withRouter(withStyles(styles)(AddressTitle)));
