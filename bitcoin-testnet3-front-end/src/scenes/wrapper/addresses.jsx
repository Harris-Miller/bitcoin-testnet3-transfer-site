import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  primary: {
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
});

class Addresses extends Component {
  static propTypes = {
    closeDrawer: PropTypes.func,
    history: PropTypes.shape().isRequired,
    classes: PropTypes.shape().isRequired,
    addresses: PropTypes.shape().isRequired
  };

  static defaultProps = {
    closeDrawer: () => {}
  };

  handleClick = key => {
    this.props.history.push(`/address/${key}`);
    this.props.closeDrawer();
  };

  render() {
    const { classes, addresses } = this.props;

    return (
      <List>
        <ListItem>
          <ListItemText primary="Addresses" />
        </ListItem>
        <List disablePadding>
          {Object.keys(addresses).map(key => (
            <ListItem key={key} button className={classes.nested} onClick={() => this.handleClick(key)}>
              <ListItemText primary={key} classes={{ primary: classes.primary }} />
            </ListItem>
          ))}
        </List>
      </List>
    );
  }
}

const mapStateToProps = ({ addresses }) => ({ addresses: addresses.toJS() });

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Addresses)));
