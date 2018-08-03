import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import QRCode from 'qrcode.react';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  root: {
    flexGrow: 1
  }
});

class QRCodeDialog extends Component {
  static propTypes = {
    onClose: PropTypes.func,
    classes: PropTypes.shape().isRequired,
    address: PropTypes.shape().isRequired
  };

  static defaultProps = {
    onClose: () => {}
  };

  handleClose = () => {
    this.props.onClose();
  };

  render() {
    const { classes, address, ...rest } = this.props;
    const qrValue = `bitcoin:${address}`;

    return (
      <div>
        <Dialog
          onClose={this.handleClose}
          {...rest}
        >
          <DialogContent>
            <Grid container justify="center" alignItems="center" className={classes.root}>
              <Grid item>
                <QRCode value={qrValue} />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(withMobileDialog()(QRCodeDialog));
