import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  priceEarningSec: {
    padding: theme.spacing(1, 2, 3),
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(2),
    width: 250,

  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

function PriceEarningMultipleInputs(props) {

  const handleChange = e => {
    console.log('e: ', e);
    const { target: { value, name } } = e;

    props.setInputs( prevInputs => ({
      ...prevInputs,
      [name]: value === '' ? '' : Number(value)
    }));

  }

  const classes = useStyles();
  const { inputs } = props;
  console.log('inputs: ', inputs);
  return (
    <div>
      <Paper className={classes.priceEarningSec}>
        <Typography component="p">
          Inputs
        </Typography>

        {/* EPS */}
        <div>
          <TextField
            id="standard-number"
            label="EPS"
            value={inputs.eps}
            name="eps"
            onChange={handleChange}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
        </div>

        {/* Median historical P/E */}
        <div>
          <TextField
            id="standard-number"
            label="Median historical P/E"
            value={inputs.medianHistPE}
            name="medianHistPE"
            onChange={handleChange}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
        </div>

        {/* Expected growth rate */}
        <div>
          <TextField
            id="standard-number"
            label="Expected growth rate"
            value={inputs.expectGrowthRate}
            name="expectGrowthRate"
            onChange={handleChange}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
        </div>

        {/* Margin of Safety */}
        <div>
          <TextField
            id="standard-number"
            label="Margin of Safety"
            value={inputs.marginSafety}
            name="marginSafety"
            onChange={handleChange}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
        </div>

        {/* Conservative growth rate */}
        <div>
          <TextField
            disabled
            id="standard-number"
            label="Conservative growth rate"
            value={inputs.conservGrowthRt.toFixed(2)}
            name="conservGrowthRt"
            onChange={handleChange}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            variant="filled"
          />
        </div>

        {/* Growth decline rate */}
        <div>
          <TextField
            id="standard-number"
            label="Growth decline rate"
            value={inputs.growthDeclineRt}
            name="growthDeclineRt"
            onChange={handleChange}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
        </div>

        {/* Discount Rate */}
        <div>
          <TextField
            id="standard-number"
            label="Discount rate"
            value={inputs.discountRt}
            name="discountRt"
            onChange={handleChange}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
        </div>
      </Paper>
      
    </div>
  );
}

export default PriceEarningMultipleInputs;
