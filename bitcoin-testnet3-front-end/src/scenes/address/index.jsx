import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from 'moment';
import AddressTitle from './title';
import BalanceDisplay from './balance-display';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
});

function sortTransactionsKeysByRecieved(txs) {
  return Object.keys(txs)
    .sort((a, b) => {
       const aDate = new Date(txs[a].received);
       const bDate = new Date(txs[b].received);

       if (aDate > bDate) { return -1; }
       if (bDate> aDate) { return 1; }

       return 0
    });
}

class Address extends Component {
  progressPercentage = confirmations => ((confirmations >= 6) ? 100 : ((confirmations / 6) * 100));

  progressColor = confirmations => (confirmations >= 6) ? 'primary' : 'secondary';

  withAddress(address) {
    const { classes } = this.props;

    const transactionPanel = (txs, addr) => {
      const txsValue = txs.outputs.filter(t => t.addresses && t.addresses.includes(addr))[0].value;

      return (<ExpansionPanel key={txs.hash}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container>
            <Grid item xs={12}>
              <Typography component="span" className={classes.heading} gutterBottom={true}>{txs.hash}</Typography>
            </Grid>
            <Grid item xs={12}>
              <LinearProgress
                variant="buffer"
                color={this.progressColor(txs.confirmations)}
                value={this.progressPercentage(txs.confirmations)}
                valueBuffer={100} />
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container justify="space-between" alignItems="center">
            <Grid item xs={12} md={6}>
              <BalanceDisplay text="Value" value={txsValue} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>Received: {txs.received && moment(txs.received).format('M/D/Y h:mm:ss a')}</Typography>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )};

    return (
      <div>
        <AddressTitle address={address} />
        <div className={classes.root}>
          {sortTransactionsKeysByRecieved(address.txs).map(key => transactionPanel(address.txs[key], address.address))}
        </div>
      </div>
    );
  }

  // on direct load of route, the page loads before the async call to get user data,
  // so for a moment, there is no this.props.addresses
  // in that case, we need to just render an empty page for the split second before hand
  // return a turnary to that empty <div> or the this.withAddress() method once address is populated
  render() {
    const { match, addresses } = this.props;
    const address = addresses[match.params.address];

    return address ? this.withAddress(address) : (<div></div>);
  }
}

const mapStateToProps = ({ addresses }) =>({ addresses: addresses.toJS() });

export default connect(mapStateToProps)(withStyles(styles)(Address));
