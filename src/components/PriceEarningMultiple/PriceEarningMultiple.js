import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PriceEarningMultipleInputs from './PriceEarningMultipleInputs';
import PriceEarningMultipleCalc from './PriceEarningMultipleCalc';

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


function PriceEarningMultiple() {
  const classes = useStyles();

  const [inputs, setInputs] = useState({
    eps: 13.97,
    medianHistPE: 18.00,
    expectGrowthRate: 0.2,
    marginSafety: 0.25,
    conservGrowthRt: 0.15,
    growthDeclineRt: 0.05,
    discountRt: 0.09,
  });

  return (
    <div className={classes.root}>
      <Typography variant="h5" component="h3" className={classes.heading}>
        Price Earning Multiple
      </Typography>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        className={classes.body}
      >
        <PriceEarningMultipleInputs
          inputs={inputs}
          setInputs={setInputs}
        />
        <PriceEarningMultipleCalc
          inputs={inputs}
          setInputs={setInputs}
        />
      </Grid>
    </div>
  );
}

export default PriceEarningMultiple;
