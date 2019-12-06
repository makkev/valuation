import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
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
    backgroundColor: '#66D9EF',
    color: 'white',

    // boxSizing: 'border-box',
  },
}));

function PriceEarningMultipleVal(props) {
  const { presentVal } = props;
  const classes = useStyles();
  return (
    <div>
      <Paper className={classes.mainPaper}>
        <Typography variant="h4" component="h4">
          {`$${presentVal.toFixed(0)}`}
        </Typography>
      </Paper>
    </div>
  );
}

PriceEarningMultipleVal.propTypes = {
  presentVal: PropTypes.number.isRequired,
};

export default PriceEarningMultipleVal;
