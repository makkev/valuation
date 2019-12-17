import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  ROEClass: {
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

function ROEInputs(props) {
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

  const inMeta = [
    {
      label: 'Shareholders equity',
      value: inputs.shareholdersEquity,
      name: 'shareHoldersEquity',
    },
    {
      label: 'Price',
      value: inputs.price,
      name: 'price',
    },
    {
      label: 'Return on Equity (avg)',
      value: inputs.ROE,
      name: 'ROE',
    },
    {
      label: 'Shares outstanding',
      value: inputs.sharesOutstanding,
      name: 'sharesOutstanding',
    },
    {
      label: 'Dividend Yield',
      value: inputs.dividendYield,
      name: 'dividendYield',
    },
    {
      label: 'Dividend payout ratio',
      value: inputs.dividendPayoutRatio,
      name: 'dividendPayoutRatio',
    },
    {
      label: 'Margin of Safety',
      value: inputs.marginOfSafety,
      name: 'marginOfSafety',
    },
    {
      label: 'Conservative growth rate',
      value: inputs.conservativeGrowthRate,
      name: 'conservativeGrowthRate',
    },
    {
      label: 'Discount rate',
      value: inputs.discountRate,
      name: 'discountRate',
    },
  ];

  return (
    <div>
      <Paper className={classes.ROEClass}>
        <Typography component="p">
          Inputs
        </Typography>

        {inMeta.map((r) => (
          <div key={r.name}>
            <TextField
              id="standard-number"
              label={r.label}
              value={r.value}
              name={r.name}
              onChange={handleChange}
              type="number"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
            />
          </div>
        ))}
      </Paper>
    </div>
  );
}

ROEInputs.propTypes = {
  inputs: PropTypes.shape({
    shareholdersEquity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    ROE: PropTypes.number.isRequired,
    sharesOutstanding: PropTypes.number.isRequired,
    dividendYield: PropTypes.number.isRequired,
    dividendPayoutRatio: PropTypes.number.isRequired,
    marginOfSafety: PropTypes.number.isRequired,
    conservativeGrowthRate: PropTypes.number.isRequired,
    discountRate: PropTypes.number.isRequired,

  }).isRequired,
  setInput: PropTypes.func.isRequired,
};

export default ROEInputs;
