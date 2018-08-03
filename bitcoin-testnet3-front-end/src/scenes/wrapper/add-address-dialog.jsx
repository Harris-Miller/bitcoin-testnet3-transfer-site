import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import QrReader from 'react-qr-reader';
import TextInput from '../../components/text-input';
import { addAddress, getAddresses } from '../../actions/address';

class AddAddressDialog extends Component {
  state = {
    open: false,
    showQrReader: false,
    address: '',
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
    // ignore errors
  };

  handleScan = result => {
    if (result) {
      const address = result.includes(':')
        ? result.split(':')[1]
        : result;
      
      this.setState({ address, showQrReader: false });
    }
  };

  createNewAddress = () => {
    fetch('https://api.blockcypher.com/v1/btc/test3/addrs', {
      method: 'POST'
      // headers: { 'Access-Control-Request-Headers': null }
    })
    .then(data => data.json())
    .then(({ address }) => {
      this.setState({ address }, () => {
        this.addAddress();
      });
    });
  };

  addAddress = () => {
    const { address } = this.state;
    const { auth, dispatch } = this.props;
    const userId = auth.user.id;

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

    addAddress(userId, address)
      .then(address => {
        dispatch(getAddresses(userId));
        this.handleClose()
      })
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
              alignItems="center"
            >
              <Grid item>
                Add Address
              </Grid>
              <Grid item>
                <Tooltip title="Scan QR Code">
                  <IconButton onClick={() => this.setState({ showQrReader: !this.state.showQrReader })}>
                    <PhotoCameraIcon />
                  </IconButton>
                </Tooltip>
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
              <Grid item>
                <Button onClick={this.createNewAddress} color="primary">
                  Create New Address
                </Button>
              </Grid>
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

const mapStateToProps = ({ auth }) => ({ auth: auth.toJS() });

export default connect(mapStateToProps)(withMobileDialog()(AddAddressDialog));
