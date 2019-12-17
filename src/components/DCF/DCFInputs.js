import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  DCFClass: {
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

function DCFInputs(props) {
  const handleChange = (e) => {
    const { target: { value, name } } = e;
    const { setInput } = props;

    if (value) {
      setInput(name, value);
    } else {
      setInput(name, 0);
    }
  };

  const classes = useStyles();
  const { inputs } = props;
  return (
    <div>
      <Paper className={classes.DCFClass}>
        <Typography component="p">
          inputs
        </Typography>

        {/* Total Cash */}
        <div>
          <TextField
            id="standard-number"
            label="Total cash (mil)"
            value={inputs.totalCash}
            name="totalCash"
            onChange={handleChange}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
        </div>

        {/* Total Debt */}
        <div>
          <TextField
            id="standard-number"
            label="Total Debt (mil)"
            value={inputs.totalDebt}
            name="totalDebt"
            onChange={handleChange}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
        </div>

        {/* Free cash flow */}
        <div>
          <TextField
            id="standard-number"
            label="Free cash flow (mil)"
            value={inputs.freeCashFlow}
            name="freeCashFlow"
            onChange={handleChange}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
        </div>

        {/* Shares outstanding */}
        <div>
          <TextField
            id="standard-number"
            label="Shares outstanding (mil)"
            value={inputs.sharesOutstanding}
            name="sharesOutstanding"
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
            label="Total Debt"
            value={inputs.totalDebt}
            name="totalDebt"
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
            label="Margin Of Safety"
            value={inputs.marginOfSafety}
            name="marginOfSafety"
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
            value={inputs.conservativeGrowthRate}
            name="conservativeGrowthRate"
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
            value={inputs.growthDeclineRate}
            name="growthDeclineRate"
            onChange={handleChange}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
        </div>

        {/* Discount rate */}
        <div>
          <TextField
            id="standard-number"
            label="Discount rate"
            value={inputs.discountRate}
            name="discountRate"
            onChange={handleChange}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
        </div>

        {/* Valuation last FCF */}
        <div>
          <TextField
            id="standard-number"
            label="Valuation last FCF"
            value={inputs.valuationLastFCF}
            name="valuationLastFCF"
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

DCFInputs.propTypes = {
  inputs: PropTypes.shape({
    totalCash: PropTypes.number.isRequired,
    totalDebt: PropTypes.number.isRequired,
    freeCashFlow: PropTypes.number.isRequired,
    sharesOutstanding: PropTypes.number.isRequired,
    expectedGrowthRate: PropTypes.number.isRequired,
    marginOfSafety: PropTypes.number.isRequired,
    conservativeGrowthRate: PropTypes.number.isRequired,
    growthDeclineRate: PropTypes.number.isRequired,
    discountRate: PropTypes.number.isRequired,
    valuationLastFCF: PropTypes.number.isRequired,

  }).isRequired,
  setInput: PropTypes.func.isRequired,
};

export default DCFInputs;
