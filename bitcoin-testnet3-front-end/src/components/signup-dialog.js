import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
// import withMobileDialog from '@material-ui/core/withMobileDialog';
import { withStyles } from '@material-ui/core/styles';
import TextInput from './text-input';

import axios from 'axios';

const styles = theme => ({
  dialog: {
    [theme.breakpoints.down('md')]: {
      width: '80%'
    }
  },
});

class SignupDialog extends Component {
  state = {
    open: false,
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    usernameError: false,
    emailError: false,
    passwordError: false,
    passwordConfirmError: false,
    usernameHelperText: '',
    emailHelperText: '',
    passwordHelperText: '',
    passwordConfirmHelperText: ''
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.props.onClose();
  };

  signup = () => {
    const { username, email, password, passwordConfirm } = this.state;
    
    // reset all errors
    this.setState({
      usernameError: false,
      emailError: false,
      passwordError: false,
      passwordConfirmError: false,
      usernameHelperText: '',
      emailHelperText: '',
      passwordHelperText: '',
      passwordConfirmHelperText: ''
    });

    if (!username) {
      this.setState({ usernameError: true, usernameHelperText: 'User Name is required'});
    }

    if (!email) {
      this.setState({ emailError: true, emailHelperText: 'E-Mail is required'}); 
    }

    if (!password) {
      this.setState({ passwordError: true, passwordHelperText: 'Password is required'});
    }

    if (!passwordConfirm) {
      this.setState({ passwordConfirmError: true, passwordConfirmHelperText: 'Confirm Password is required'});
    }

    if (password !== passwordConfirm) {
      this.setState({ passwordConfirmError: true, passwordConfirmHelperText: 'Passwords do not match!'})
    }

    if (this.state.usernameError || this.state.emailError || this.state.passwordError || this.state.passwordConfirmError) {
      return;
    }

    // TODO
    // action to signup user
    axios.post('/api/users', { username, email, password }).then(user => {
      console.log(user);
    });
  }

  handleTextChange = name => ({ target }) => this.setState({ [name]: target.value });

  render() {
    const { onClose, classes, ...rest } = this.props;
    return (
      <Dialog
        classes={{ paper: classes.dialog }}
        onClose={this.handleClose}
        {...rest}
      >
        <DialogTitle>Signup</DialogTitle>
        <DialogContent>
          <Grid container direction="column" spacing={8}>
            <Grid item>
              <TextInput
                id="username"
                label="Username"
                value={this.state.username}
                onChange={this.handleTextChange('username')}
                error={this.state.usernameError}
                helperText={this.state.usernameHelperText}
              />
            </Grid>
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
            <Grid item>
              <TextInput
                id="papssword-confirm"
                label="Confirm Password"
                type="password"
                value={this.state.passwordConfirm}
                onChange={this.handleTextChange('passwordConfirm')}
                error={this.state.passwordConfirmError}
                helperText={this.state.passwordConfirmHelperText}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.signup} color="primary">
            Signup
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(SignupDialog);
