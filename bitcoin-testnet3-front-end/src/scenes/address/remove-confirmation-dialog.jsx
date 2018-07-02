import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1
  }
});


class QRCodeDialog extends Component {
  handleClose = () => {
    this.props.onClose();
  };

  handleConfirm = () => {
    this.props.onConfirm()
  }

  render() {
    const { classes, address, ...rest } = this.props;

    return (
      <div>
        <Dialog
          onClose={this.handleClose}
          {...rest}
        >
          <DialogTitle>Remove Address</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleConfirm} color="primary">
              Remove
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(withMobileDialog()(QRCodeDialog));