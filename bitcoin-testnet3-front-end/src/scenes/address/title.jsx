import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  row: {
    marginBottom: '16px'
  }
});

class AddressTitle extends Component {
  static propTypes = {
    address: PropTypes.object.isRequired
  };

  render() {
    const { classes, address } = this.props;

    const title = (
      <Grid container className={classes.row}>
        <Typography variant="heading">{address.address}</Typography>
      </Grid>
    );

    const nicknametitle = (
      <Grid container className={classes.row}>
        <Typography variant="heading">{address.nickname}</Typography>
        <Typography variant="subheading">{address.address}</Typography>
      </Grid>
    );

    return (
      <Paper className={classes.root}>
        {address.nickname ? nicknametitle : title}
        <Grid container justify="space-between" className={classes.row}>
          <Grid item>
            <Typography>Balance: {address.balance}</Typography>
          </Grid>
          <Grid item>
            <Typography>Unconfirmed Balance: {address.unconfirmed_balance}</Typography>
          </Grid>
          <Grid item>
            <Typography>Final Balance: {address.final_balance}</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <Typography>Transactions: {address.final_n_tx}</Typography>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(AddressTitle);
