import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import immutableProptypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Octicon from 'react-octicon';
import SignupDialog from './signup-dialog';
import LoginDialog from './login-dialog';
import { removeCurrentUser } from '../actions/auth';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  flex: {
    flex: 1
  },
  anchorInheritColor: {
    '&:link': {
      color: 'inherit'
    },
    '&:visited': {
      color: 'inherit'
    }
  }
});

class ResponsiveDrawer extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    auth: immutableProptypes.map.isRequired
  };

  state = {
    mobileOpen: false,
    signupDialogOpen: false,
    loginDialogOpen: false
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  logout = () => {
    this.props.dispatch(removeCurrentUser());
  };

  render() {
    const { classes, theme, auth } = this.props;

    console.log(auth.get('user'));

    const loggedOut = (
      <Fragment>
        <Button color="inherit" onClick={() => this.setState({ signupDialogOpen: true })}>Signup</Button>
        <Button color="inherit" onClick={() => this.setState({ loginDialogOpen: true })}>Login</Button>
      </Fragment>
    );

    const loggedIn = (
      <Fragment>
        <Typography>{auth.has('user') && auth.get('user').username}</Typography>
        <Button color="inherit" onClick={() => this.logout()}>Logout</Button>
      </Fragment>
    );

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List></List>
        <Divider />
        <List></List>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap className={classes.flex}>
              Responsive drawer
            </Typography>
            <div>
              {auth.get('isAuthenticated') ? loggedIn : loggedOut}
              <a
                href="https://github.com/Harris-Miller/bitcoin-testnet3-transfer-site"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.anchorInheritColor}
              >
                <Octicon name="mark-github" mega />
              </a>
            </div>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.props.children}
          <SignupDialog open={this.state.signupDialogOpen} onClose={() => this.setState({ signupDialogOpen: false })} />
          <LoginDialog open={this.state.loginDialogOpen} onClose={() => this.setState({ loginDialogOpen: false })} />
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(ResponsiveDrawer));
