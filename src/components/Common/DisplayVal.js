import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '40%',
  },
  mainPaper: {
    padding: theme.spacing(1, 1, 1, 1),
    margin: theme.spacing(2, 2, 2, 2),
    minWidth: '80%',
    display: 'flex',
    // backgroundColor: '#3f50b5',
    backgroundColor: '#ffc600',
    color: 'black',

    // boxSizing: 'border-box',
  },
}));

const delay = (t) => new Promise((resolve) => {
  setTimeout(() => resolve('wait...'), t);
});

const DisplayVal = (props) => {
  const { presentVal } = props;
  const classes = useStyles();
  const [zoomIn, setZoomIn] = useState(true);

  useEffect(() => {
    async function zooming() {
      setZoomIn(false);
      await delay(100);
      setZoomIn(true);
    }
    zooming();
  }, [presentVal]);

  return (
    <div>
      <Zoom in={zoomIn}>
        <Paper className={classes.mainPaper}>
          <Typography variant="h4" component="h4">
            {`$${presentVal.toFixed(0)}`}
          </Typography>
        </Paper>
      </Zoom>
    </div>
  );
};

DisplayVal.propTypes = {
  presentVal: PropTypes.number.isRequired,
};

export default DisplayVal;
