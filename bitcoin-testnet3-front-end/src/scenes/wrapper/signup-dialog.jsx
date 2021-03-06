import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import TextInput from '../../components/text-input';
import { singupUser, login, setCurrentUser } from '../../actions/auth';

class SignupDialog extends Component {
  static propTypes = {
    onClose: PropTypes.func,
    dispatch: PropTypes.func.isRequired,
    classes: PropTypes.shape().isRequired
  };

  static defaultProps = {
    onClose: () => {}
  };

  state = {
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
      this.setState({ usernameError: true, usernameHelperText: 'User Name is required' });
    }

    if (!email) {
      this.setState({ emailError: true, emailHelperText: 'E-Mail is required' });
    }

    if (!password) {
      this.setState({ passwordError: true, passwordHelperText: 'Password is required' });
    }

    if (!passwordConfirm) {
      this.setState({ passwordConfirmError: true, passwordConfirmHelperText: 'Confirm Password is required' });
    }

    if (password !== passwordConfirm) {
      this.setState({ passwordConfirmError: true, passwordConfirmHelperText: 'Passwords do not match!' });
    }

    if (this.state.usernameError || this.state.emailError || this.state.passwordError || this.state.passwordConfirmError) {
      return;
    }

    singupUser({ username, email, password })
      .then(() => login({ email, password }))
      .then(token => {
        this.props.dispatch(setCurrentUser(token));
        this.handleClose();
      });
  };

  handleTextChange = name => ({ target }) => this.setState({ [name]: target.value });

  render() {
    // dispatch is just so it's not passed to Dialog
    const { onClose, classes, dispatch: _, ...rest } = this.props;

    return (
      <Dialog
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

export default connect()(withMobileDialog()(SignupDialog));
