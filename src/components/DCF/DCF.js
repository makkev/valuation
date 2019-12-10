import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useSelector } from 'react-redux';
import DCFInputs from './DCFInputs';
// import PriceEarningMultipleCalc from './PriceEarningMultipleCalc';

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


function DCF() {
  const classes = useStyles();

  const inputFromRedux = useSelector((state) => state.priceEarningMultiple.inputs);
  // console.log('inputFromRedux:', inputFromRedux);

  const [inputs, setInputs] = useState({
    totalCash: 40546,
    totalDebt: 16960,
    freeCashFlow: 46737,
    sharesOutstanding: 6029.67,
    expectedGrowthRate: 0.1537,
    marginOfSafety: 0.25,
    conservativeGrowthRate: 0.1153,
    growthDeclineRate: 0.05,
    discountRate: 0.1,
    valuationLastFCF: 12,
  });

  return (
    <div className={classes.root}>
      <Typography variant="h5" component="h3" className={classes.heading}>
        Discounted Cash Flow model
      </Typography>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        className={classes.body}
      >
        <DCFInputs
          inputs={inputs}
          setInputs={setInputs}
        />
        {/* <PriceEarningMultipleCalc
          inputs={inputs}
          setInputs={setInputs}
        /> */}
      </Grid>
    </div>
  );
}

export default DCF;
