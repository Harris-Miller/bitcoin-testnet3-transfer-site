import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
// import withMobileDialog from '@material-ui/core/withMobileDialog';
import { withStyles } from '@material-ui/core/styles';
import TextInput from './text-input';
import { login, setCurrentUser } from '../actions/auth';

const styles = theme => ({
  dialog: {
    [theme.breakpoints.down('md')]: {
      width: '80%'
    }
  },
});

class AddAddressDialog extends Component {
  state = {
  };

  render() {
    const { onClose, classes, dispatch, ...rest } = this.props;

    return (
      <div>
        <Dialog
          classes={{ paper: classes.dialog }}
          onClose={this.handleClose}
          {...rest}
        >
          <DialogTitle>Login</DialogTitle>
          <DialogContent>

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.login} color="primary">
              Login
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default connect()(withStyles(styles)(AddAddressDialog));
