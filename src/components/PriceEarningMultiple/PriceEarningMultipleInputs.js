import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
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
  const handleChange = (e) => {
    const { target: { value, name } } = e;
    const { setInputs } = props;

    if (value) {
      setInputs(name, value);
    } else {
      setInputs(name, 0);
    }
  };

  const classes = useStyles();
  const { inputs } = props;

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

PriceEarningMultipleInputs.propTypes = {
  inputs: PropTypes.shape({
    eps: PropTypes.number.isRequired,
    medianHistPE: PropTypes.number.isRequired,
    expectGrowthRate: PropTypes.number.isRequired,
    marginSafety: PropTypes.number.isRequired,
    conservGrowthRt: PropTypes.number.isRequired,
    growthDeclineRt: PropTypes.number.isRequired,
    discountRt: PropTypes.number.isRequired,
  }).isRequired,
  setInputs: PropTypes.func.isRequired,
};

export default PriceEarningMultipleInputs;
