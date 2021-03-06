import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
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
import Tooltip from '@material-ui/core/Tooltip';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import Octicon from 'react-octicon';
import Addresses from './addresses';
import Exchange from './exchange';
import MadeBy from './made-by';
import Fab from '../../components/fab';
import SignupDialog from './signup-dialog';
import LoginDialog from './login-dialog';
import AddAddressDialog from './add-address-dialog';
import { removeCurrentUser } from '../../actions/auth';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    position: 'relative',
    display: 'flex',
    width: '100%'
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative'
    }
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    overflow: 'scroll'
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
  outlet: {
    marginBottom: '60px'
  }
});

class ResponsiveDrawer extends Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    theme: PropTypes.shape().isRequired,
    auth: PropTypes.shape().isRequired,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.shape().isRequired,
    children: PropTypes.element.isRequired
  };

  state = {
    mobileOpen: false,
    signupDialogOpen: false,
    loginDialogOpen: false,
    addressDialogOpen: false
  };

  closeDrawer = () => {
    this.setState({ mobileOpen: false });
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  logout = () => {
    const { dispatch, history } = this.props;
    dispatch(removeCurrentUser());
    history.push('/');
    this.closeDrawer();
  };

  handleLoginClick = () => {
    this.closeDrawer();
    this.setState({ loginDialogOpen: true });
  };

  handleSignupClick = () => {
    this.closeDrawer();
    this.setState({ signupDialogOpen: true });
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
            <ListItem button onClick={this.handleSignupClick}>
              <ListItemText primary="Signup" />
            </ListItem>
          </List>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={this.handleLoginClick}>
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
        <Addresses closeDrawer={this.closeDrawer} />
      </div>
    );

    const drawer = (
      <Grid container direction="column" justify="space-between" style={{ flexGrow: 1 }}>
        <Grid item>
          {auth.isAuthenticated ? loggedIn : loggedOut}
        </Grid>
        <Grid item>
          <MadeBy />
        </Grid>
      </Grid>
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
              Testnet3
            </Typography>
            <div>
              <Exchange />
              <Tooltip title="Home">
                <IconButton color="inherit" onClick={this.toHome}>
                  <HomeIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Github">
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
              </Tooltip>
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
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
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
              paper: classes.drawerPaper
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div className={classes.outlet}>
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
