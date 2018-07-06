import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const MadeBy = () => (
  <Grid container justify="center" style={{ position: 'relative', bottom: '0', padding: '6px' }} >
    <Grid item>
      <Typography>Made with &#9829; by Harris Miller</Typography>
    </Grid>
  </Grid>
);

export default MadeBy;
