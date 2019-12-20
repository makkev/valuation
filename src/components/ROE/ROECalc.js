import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import DisplayVal from '../Common/DisplayVal';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '70%',
  },
  mainPaper: {
    padding: theme.spacing(1, 1, 1),
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
  tablePaper: {
    margin: theme.spacing(2, 2, 3, 2),
    // marginTop: theme.spacing(1),
    width: '80%',
    overflowX: 'auto',
    // marginBottom: theme.spacing(3),
  },
  table: {
    minWidth: 100,
  },
  yearCol: { width: '5%' },

  alignRight: {
    textAlign: 'right',
  },
}));

const YEARS = 10;

const calcVal = (n, shareholdersEquity, conservativeGrowthRate, sharesOutstanding,
  price, dividendYield, discountRate) => {
  let yearlyHoldersEq = 0;
  let yearlyDiv = 0;
  let yearlyNPVDiv = 0;
  const val = [];
  for (let i = 0; i < n; i += 1) {
    if (i === 0) {
      yearlyHoldersEq = (shareholdersEquity * (1 + conservativeGrowthRate)) / sharesOutstanding;
      yearlyDiv = (price * dividendYield) * (1 + conservativeGrowthRate);
    } else {
      yearlyHoldersEq = val[i - 1].yearlyHoldersEq * (1 + conservativeGrowthRate);
      yearlyDiv = val[i - 1].yearlyDiv * (1 + conservativeGrowthRate);
    }
    yearlyNPVDiv = yearlyDiv / ((1 + discountRate) ** i);
    val.push({
      year: i + 1,
      yearlyHoldersEq,
      yearlyDiv,
      yearlyNPVDiv,
    });
  }
  return val;
};

const setInitVal = (n) => {
  const val = [];
  for (let i = 0; i < n; i += 1) {
    val.push({
      year: i + 1,
      yearlyHoldersEq: 0,
      yearlyNPVdiv: 0,
    });
  }
  return val;
};

export default function DCFCalc(props) {
  const [val, setVal] = useState([]);
  const [yr10NetIncome, setYr10NetIncome] = useState(0);
  const [requiredVal, setRequiredVal] = useState(0);
  const [NPVRequiredVal, setNPVRequiredVal] = useState(0);
  const [NPVDividends, setNPVDividends] = useState(0);
  const [intrinsicVal, setIntrinsicVal] = useState(0);

  const classes = useStyles();

  const {
    inputs: {
      shareholdersEquity,
      price,
      ROE,
      sharesOutstanding,
      dividendYield,
      conservativeGrowthRate,
      discountRate,
    },
  } = props;


  useEffect(() => {
    setVal(calcVal(YEARS, shareholdersEquity, conservativeGrowthRate, sharesOutstanding,
      price, dividendYield, discountRate));
  }, [shareholdersEquity, conservativeGrowthRate, sharesOutstanding]);

  useEffect(() => {
    if (val.length >= YEARS) {
      const lastNetIncome = val[YEARS - 1].yearlyHoldersEq * ROE;
      setYr10NetIncome(lastNetIncome);

      const reqVal = lastNetIncome / discountRate;
      setRequiredVal(reqVal);

      const npvReqVal = reqVal / ((1 + discountRate) ** YEARS);
      setNPVRequiredVal(npvReqVal);

      const totalNpvDiv = val.reduce((sum, val) => sum + val.yearlyNPVDiv, 0);
      setNPVDividends(totalNpvDiv);

      setIntrinsicVal(npvReqVal + totalNpvDiv);
    }
  }, [val, ROE, discountRate]);

  return (
    <div className={classes.root}>
      {/* <div> */}
      <DisplayVal presentVal={intrinsicVal} />
      <Paper className={classes.mainPaper}>
        <Typography component="p">
          Calculations (per share)
        </Typography>
        <Paper className={classes.tablePaper}>
          <Table className={classes.table} size="small">
            <TableHead>
              <TableRow>
                <TableCell className={classes.yearCol} align="right">Year</TableCell>
                <TableCell align="right">Shareholders equity</TableCell>
                <TableCell align="right">Dividend</TableCell>
                <TableCell align="right">NPV dividends</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {val.map((v) => (
                <TableRow key={v.year}>
                  <TableCell align="right">{v.year}</TableCell>
                  <TableCell align="right">{v.yearlyHoldersEq.toFixed(2)}</TableCell>
                  <TableCell align="right">{v.yearlyDiv.toFixed(2)}</TableCell>
                  <TableCell align="right">{v.yearlyNPVDiv.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        <Grid container>

          <Grid item xs={6}>
            <Typography className={classes.alignRight}>
              {'Year 10 net income: '}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classes.alignRight}>
              {yr10NetIncome.toFixed(2)}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography className={classes.alignRight}>
              {'Required value: '}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classes.alignRight}>
              {requiredVal.toFixed(2)}
            </Typography>
          </Grid>
          <p />
          <p />
          <Grid item xs={6}>
            <Typography className={classes.alignRight}>
              {'NPV required value: '}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classes.alignRight}>
              {NPVRequiredVal.toFixed(2)}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography className={classes.alignRight}>
              {'NPV dividends: '}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classes.alignRight}>
              {NPVDividends.toFixed(2)}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography className={classes.alignRight}>
              {'Intrinsic value: '}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classes.alignRight}>
              {intrinsicVal.toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

DCFCalc.propTypes = {
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
};
