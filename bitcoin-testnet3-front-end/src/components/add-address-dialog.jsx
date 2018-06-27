import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Grid from '@material-ui/core/Grid';
import QrReader from 'react-qr-reader';
import TextInput from './text-input';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

class AddAddressDialog extends Component {
  state = {
    open: false,
    showQrReader: false,
    address: '',
    nickname: '',
    addressError: false,
    addressHelperText: ''
  };

  handleTextChange = name => ({ target }) => this.setState({ [name]: target.value });

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.props.onClose();
  };

  handleError = err => {

  };

  handleScan = result => {
    if (result) {
      const address = result.includes(':')
        ? result.split(':')[1]
        : result;
      
      this.setState({ address, showQrReader: false });
    }
  };

  addAddress = () => {
    const { address, nickname } = this.state;

    // reset all errors
    this.setState({
      addressError: false,
      addressHelperText: ''
    });

    if (!address) {
      this.setState({ addressError: true, addressHelperText: 'Address is required'}); 
    }

    if (this.state.addressError) {
      return;
    }

    // TODO
  };

  render() {
    const { onClose, classes, dispatch, ...rest } = this.props;

    return (
      <div>
        <Dialog
          onClose={this.handleClose}
          {...rest}
        >
          <DialogTitle>
            <Grid
              container
              justify="space-between"
            >
              <Grid item>
                Add Address
              </Grid>
              <Grid item>
                <Button color="primary" onClick={() => this.setState({ showQrReader: !this.state.showQrReader })}>
                  <PhotoCameraIcon />
                </Button>
              </Grid>
            </Grid>
          </DialogTitle>
          <DialogContent>
            <Grid container direction="column" spacing={8}>
              <Grid item>
                <TextInput
                  id="address"
                  label="Address"
                  value={this.state.address}
                  onChange={this.handleTextChange('address')}
                  error={this.state.addressError}
                  helperText={this.state.addressHelperText}
                />
              </Grid>
              <Grid item>
                <TextInput
                  id="nickname"
                  label="Nickname"
                  value={this.state.nickname}
                />
              </Grid>
              {this.state.showQrReader &&
                <Grid item>
                  <QrReader
                    delay={300}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    style={{ width: '100%' }}
                  />
                </Grid>
              }
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.addAddress} color="primary">
              Add Address
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default connect()(withMobileDialog()(AddAddressDialog));
