import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  absolute: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
});

const Fab = props => {
  const { classes, onClick } = props;

  return (
    <div>
      <Tooltip title="Add an address">
        <Button variant="fab" color="secondary" className={classes.absolute} onClick={onClick}>
          <AddIcon />
        </Button>
      </Tooltip>
    </div>
  );
}

Fab.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func
};

export default withStyles(styles)(Fab);
