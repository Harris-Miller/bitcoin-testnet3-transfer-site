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
import { login, setCurrentUser } from '../../actions/auth';

class LoginDialog extends Component {
  static propTypes = {
    onClose: PropTypes.func,
    dispatch: PropTypes.func.isRequired,
    classes: PropTypes.shape().isRequired
  };

  static defaultProps = {
    onClose: () => {}
  };

  state = {
    email: '',
    password: '',
    emailError: false,
    passwordError: false,
    emailHelperText: '',
    passwordHelperText: ''
  };

  handleClose = () => {
    this.props.onClose();
  };

  login = () => {
    const { email, password } = this.state;

    // reset all errors
    this.setState({
      emailError: false,
      passwordError: false,
      emailHelperText: '',
      passwordHelperText: ''
    });

    if (!email) {
      this.setState({ emailError: true, emailHelperText: 'E-Mail is required' });
    }

    if (!password) {
      this.setState({ passwordError: true, passwordHelperText: 'Password is required' });
    }

    if (this.state.emailError || this.state.passwordError) {
      return;
    }

    login({ email, password })
      .then(token => {
        this.props.dispatch(setCurrentUser(token));
        this.handleClose();
      });
  };

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

export default connect()(withMobileDialog()(LoginDialog));
