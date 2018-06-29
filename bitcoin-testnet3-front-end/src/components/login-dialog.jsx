import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import TextInput from './text-input';
import { login, setCurrentUser } from '../actions/auth';
import { getAddresses } from '../actions/address';

class LoginDialog extends Component {
  state = {
    open: false,
    email: '',
    password: '',
    emailError: false,
    passwordError: false,
    emailHelperText: '',
    passwordHelperText: ''
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.props.onClose();
  };

  login = () => {
    const { auth } = this.props;
    const { email, password } = this.state;
    
    // reset all errors
    this.setState({
      emailError: false,
      passwordError: false,
      emailHelperText: '',
      passwordHelperText: ''
    });

    if (!email) {
      this.setState({ emailError: true, emailHelperText: 'E-Mail is required'}); 
    }

    if (!password) {
      this.setState({ passwordError: true, passwordHelperText: 'Password is required'});
    }

    if (this.state.emailError || this.state.passwordError) {
      return;
    }

    login({ email, password })
      .then(token => {
        this.props.dispatch(setCurrentUser(token));
        this.handleClose();
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleTextChange = name => ({ target }) => this.setState({ [name]: target.value });

  render() {
    const { onClose, classes, dispatch, ...rest } = this.props;

    return (
      <div>
        <Dialog
          onClose={this.handleClose}
          {...rest}
        >
          <DialogTitle>Login</DialogTitle>
          <DialogContent>
            <Grid container direction="column" spacing={8}>
              <Grid item>
                <TextInput
                  id="email"
                  label="E-Mail"
                  value={this.state.email}
                  onChange={this.handleTextChange('email')}
                  error={this.state.emailError}
                  helperText={this.state.emailHelperText}
                />
              </Grid>
              <Grid item>
                <TextInput
                  id="password"
                  label="Password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handleTextChange('password')}
                  error={this.state.passwordError}
                  helperText={this.state.passwordHelperText}
                />
              </Grid>
            </Grid>
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

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(withMobileDialog()(LoginDialog));
