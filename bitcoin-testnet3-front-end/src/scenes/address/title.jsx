import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeAddress, getAddresses } from '../../actions/address';
import QRCodeDialog from './qr-code-dialog';
import RemoveConfirmationDialog from './remove-confirmation-dialog';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  row: {
    marginBottom: '16px'
  }
});

class AddressTitle extends Component {
  static propTypes = {
    address: PropTypes.object.isRequired
  };

  state = {
    qrDialogOpen: false,
    removeDialogOpen: false
  };

  removeAddress = () => {
    const { address, auth, dispatch, history } = this.props;
    const userId = auth.user.id;

    removeAddress(userId, address.address)
      .then(address => {
        dispatch(getAddresses(userId));
        history.push('/');
      });
  };

  render() {
    const { classes, address } = this.props;

    return (
      <Paper className={classes.root}>
        <Grid container justify="space-between" className={classes.row}>
          <Grid item>
            <Typography variant="headline">
              {address.address}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={() => this.setState({ qrDialogOpen: true })}>
              <PhotoCameraIcon />
            </IconButton>
            <IconButton onClick={() => this.setState({ removeDialogOpen: true })}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid container justify="space-between" className={classes.row}>
          <Grid item>
            <Typography>Balance: {address.balance}</Typography>
          </Grid>
          <Grid item>
            <Typography>Unconfirmed Balance: {address.unconfirmed_balance}</Typography>
          </Grid>
          <Grid item>
            <Typography>Final Balance: {address.final_balance}</Typography>
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
