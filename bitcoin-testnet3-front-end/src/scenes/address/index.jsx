import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

class Address extends Component {
  // on direct load of route, the page loads before the async call to get user data,
  // so for a moment, there is no this.props.addresses
  // in that case, we need to just render an empty page for the split second before hand
  // so we put the actual page in this variable and return a turnary to this method
  // or an empty <div>
  withAddress(address) {
    const { classes } = this.props;

    const title = (
      <h1>{address.address}</h1>
    );

    const nicknametitle = (
      <h1>
        {address.nickname}
        <small>{address.address}</small>
      </h1>
    );

    const transactionPanel = (txs, addr) => {
      const txsValue = txs.outputs.filter(t => t.addresses && t.addresses.includes(addr))[0].value;

      return (<ExpansionPanel key={txs.hash}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>{txs.hash}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            {txsValue}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )};

    return (
      <div>
        {address.nickname ? nicknametitle : title}
        <div className={classes.root}>
          {address.txs.map(t =>transactionPanel(t, address.address))}
        </div>
      </div>
    );
  }

  render() {
    const { match, addresses } = this.props;
    const address = addresses[match.params.address];

    return address ? this.withAddress(address) : (<div></div>);
  }
}

const mapStateToProps = ({ addresses }) =>({ addresses: addresses.toJS() });

export default connect(mapStateToProps)(withStyles(styles)(Address));
