import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import BitcoinExchangeIcon from './bitcoin-exchange-icon';

const styles = () => ({
  root: {
    display: 'inline-flex'
  }
});

class Exchange extends Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    bpi: PropTypes.shape().isRequired
  };

  state = {
    anchorEl: null
  };

  handleClick = ({ currentTarget }) => {
    this.setState({ anchorEl: currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { classes, bpi } = this.props;
    const usdDisplayRate = bpi.bpi ? bpi.bpi.USD.rate : null;

    return (
      <Fragment>
        <Hidden smDown>
          <div className={classes.root}>
            <Typography color="inherit" variant="subheading"><b>1 BTC = ${usdDisplayRate} USD</b></Typography>
          </div>
        </Hidden>
        <Hidden mdUp>
          <Tooltip title="Display Exchange Rate">
            <IconButton onClick={this.handleClick}>
              <BitcoinExchangeIcon color="white" />
            </IconButton>
          </Tooltip>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.handleClose}>1 BTC = ${usdDisplayRate} USD</MenuItem>
          </Menu>
        </Hidden>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ bpi }) => ({ bpi });

export default connect(mapStateToProps)(withStyles(styles)(Exchange));
