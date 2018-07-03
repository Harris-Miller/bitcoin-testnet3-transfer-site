import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class Addresses extends Component {
  state = {
    open: false
  };

  handleClick = key => {
    this.props.history.push(`/${key}`);
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
              <ListItemText primary={key} />
            </ListItem>
          ))}
        </List>
      </List>
    );
  }
}

const mapStateToProps = ({ addresses }) => ({ addresses: addresses.toJS() });

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Addresses)));
