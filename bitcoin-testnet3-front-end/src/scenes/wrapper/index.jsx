import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import Octicon from 'react-octicon';
import Addresses from './addresses';
import Fab from '../../components/fab';
import SignupDialog from '../../components/signup-dialog';
import LoginDialog from '../../components/login-dialog';
import AddAddressDialog from '../../components/add-address-dialog';
import { removeCurrentUser } from '../../actions/auth';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    }
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    }
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    overflow: 'hidden'
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
  },
  scroll: {
    overflow: 'scroll'
  }
});

class ResponsiveDrawer extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };

  state = {
    mobileOpen: false,
    signupDialogOpen: false,
    loginDialogOpen: false,
    addressDialogOpen: false
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  logout = () => {
    const { dispatch, history } = this.props;
    dispatch(removeCurrentUser());
    history.push('/');
  };

  toHome = () => {
    this.props.history.push('/');
  };

  render() {
    const { classes, theme, auth } = this.props;

    const loggedOut = (
      <div>
        <div className={classes.toolbar}>
          <List>
            <ListItem button onClick={() => this.setState({ signupDialogOpen: true })}>
              <ListItemText primary="Signup" />
            </ListItem>
          </List>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={() => this.setState({ loginDialogOpen: true })}>
            <ListItemText primary="Login" />
          </ListItem>
        </List>
      </div>
    );

    const loggedIn = (
      <div>
        <div className={classes.toolbar}>
          <List>
            <ListItem>
              <ListItemText primary={auth.user && auth.user.username} />
            </ListItem>
          </List>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={() => this.logout()}>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
        <Divider />
        <Addresses />
      </div>
    );

    const drawer = auth.isAuthenticated ? loggedIn : loggedOut;

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
              Testnet3
            </Typography>
            <div>
              <IconButton color="inherit" onClick={this.toHome}>
                <HomeIcon />
              </IconButton>
              <IconButton color="inherit" >
                <a
                  href="https://github.com/Harris-Miller/bitcoin-testnet3-transfer-site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.anchorInheritColor}
                >
                  <Octicon name="mark-github" mega />
                </a>
              </IconButton>
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
          <div className={classes.scroll}>
            {this.props.children}
          </div>
          {auth.isAuthenticated && <Fab onClick={() => this.setState({ addressDialogOpen: true })} />}
          <SignupDialog open={this.state.signupDialogOpen} onClose={() => this.setState({ signupDialogOpen: false })} />
          <LoginDialog open={this.state.loginDialogOpen} onClose={() => this.setState({ loginDialogOpen: false })} />
          <AddAddressDialog open={this.state.addressDialogOpen} onClose={() => this.setState({ addressDialogOpen: false })} />
        </main>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth: auth.toJS() });

// because the children of this component contain react-router components
// we have to wrap this with `withRouter` so react-router props propogates down to them
export default withRouter(connect(mapStateToProps)(withStyles(styles, { withTheme: true })(ResponsiveDrawer)));
