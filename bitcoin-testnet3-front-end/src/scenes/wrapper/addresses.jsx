import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

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
  };

  render() {
    const { classes, addresses } = this.props;

    const addressItems = (
      <List disablePadding>
        {Object.keys(addresses).map(key => (
          <ListItem key={key} button className={classes.nested} onClick={() => this.handleClick(key)}>
            <ListItemText primary={key} />
          </ListItem>
        ))}
      </List>
    );

    return (
      <List>
        <ListItem button onClick={() => this.setState(state => ({ open: !state.open }))}>
          <ListItemText primary="Addresses" />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open}>
          {addressItems}
        </Collapse>
      </List>
    );
  }
}

const mapStateToProps = ({ addresses }) => ({ addresses: addresses.toJS() });

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Addresses)));
