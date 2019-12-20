import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch } from 'react-redux';
import ROEInputs from './ROEInputs';
import ROECalc from './ROECalc';
import { setInput as setIn } from './actions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  heading: {
    marginLeft: theme.spacing(3),
  },
  body: {
    marginLeft: theme.spacing(3),
  },
}));


function ROE() {
  const classes = useStyles();

  const inputs = useSelector((state) => state.roe.inputs);
  const dispatch = useDispatch();
  const setInput = (name, value) => {
    dispatch(setIn(name, value));
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5" component="h3" className={classes.heading}>
        ROE valuation
      </Typography>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        className={classes.body}
      >
        <ROEInputs
          inputs={inputs}
          setInput={setInput}
        />
        <ROECalc
          inputs={inputs}
          setInput={setInput}
        />
      </Grid>
    </div>
  );
}

export default ROE;
