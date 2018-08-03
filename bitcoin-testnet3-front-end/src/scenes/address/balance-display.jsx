import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  text: {
    paddingRight: '8px'
  }
});

class BalanceDisplay extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    classes: PropTypes.shape().isRequired,
    bpi: PropTypes.shape().isRequired
  };

  convertTomBTC = value => (value * 10e-6);

  convertToUSD = value => ((value * 10e-9) * parseFloat(this.props.bpi.bpi.USD.rate_float));

  render() {
    const { text, value, classes } = this.props;

    const mBtcValue = this.convertTomBTC(value);
    const usdValue = this.convertToUSD(value);

    return (
      <Grid container alignItems="center">
        <Grid item className={classes.text}>
          <Typography>{text}:</Typography>
        </Grid>
        <Grid item>
          <Grid container direction="column">
            <Grid item><Typography>{value} Satoshis</Typography></Grid>
            <Grid item><Typography>{mBtcValue} mBTC</Typography></Grid>
            <Grid item><Typography>${usdValue} USD</Typography></Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = ({ bpi }) => ({ bpi });

export default connect(mapStateToProps)(withStyles(styles)(BalanceDisplay));
