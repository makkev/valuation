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

/**
 * Calculates FCF for n number of years
 * @param {number} n
 * @param {number} freeCashFlow
 * @param {number} conservativeGrowthRate
 * @param {number} growthDeclineRate
 * @return {array} calcVal
 */
const calcFCF = (n, freeCashFlow, conservativeGrowthRate, growthDeclineRate, discountRate) => {
  const calcVal = [];
  let v = 0;
  for (let i = 0; i < 10; i += 1) {
    if (i === 0) {
      v = freeCashFlow * (1 + conservativeGrowthRate);
    } else {
      v = calcVal[i - 1].fcf
        * ((1 + (conservativeGrowthRate * ((1 - growthDeclineRate) ** i))));
    }
    calcVal.push({
      year: i + 1,
      fcf: v,
      npv: v / ((1 + discountRate) ** (i + 1)),
    });
  }
  return calcVal;
};

/**
 * TODO: delete not needed
 * Calculates NPV given an array of FCFs
 * @param {array} FCF
 * @param {number} discountRate
 * @returns {array} NPV
 */
const calcNPV = (FCF, discountRate) => FCF.map((fcf, i) => (fcf / ((1 + discountRate) ** (i + 1))));


const useStyles = makeStyles((theme) => ({
  root: {
    width: '40%',
  },
  mainPaper: {
    padding: theme.spacing(1, 2, 3),
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
  tablePaper: {
    margin: theme.spacing(2, 2, 3, 2),
    // marginTop: theme.spacing(1),
    width: '90%',
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

export default function DCFCalc(props) {
  const [valIn5, setValIn10] = useState(0);
  const [presentVal, setPresentVal] = useState(0);
  const [val, setVal] = useState([]);
  // const [NPV, setNPV] = useState([]);
  const [totalNPV, setTotalNPV] = useState(0);
  const [year10FCF, setYear10FCF] = useState(0);

  // console.log(val[9].npv);


  const classes = useStyles();

  const {
    inputs: {
      totalCash,
      totalDebt,
      freeCashFlow,
      // sharesOutstanding,
      expectedGrowthRate,
      marginOfSafety,
      conservativeGrowthRate,
      growthDeclineRate,
      discountRate,
      valuationLastFCF,
    },
    setInput,
  } = props;

  /**
   * Calculate FCF
   */
  useEffect(() => {
    setVal(calcFCF(10, freeCashFlow, conservativeGrowthRate,
      growthDeclineRate, discountRate));
    // setNPV(calcNPV(val, discountRate));
    setTotalNPV(val.reduce((total, n) => total + n.npv, 0));
  }, [
    freeCashFlow,
    conservativeGrowthRate,
    growthDeclineRate,
    discountRate,
  ]);

  // useEffect(() => {
  //   setInputs((prevInputs) => ({
  //     ...prevInputs,
  //     conservativeGrowthRate: expectedGrowthRate * (1 - marginOfSafety),
  //   }));
  // }, [expectedGrowthRate, marginOfSafety, setInputs]);
  useEffect(() => {
    setInput('conservativeGrowthRate', expectedGrowthRate * (1 - marginOfSafety));
  }, [expectedGrowthRate, marginOfSafety]);

  return (
    <div className={classes.root}>
      {/* <div> */}
      <DisplayVal presentVal={presentVal} />
      <Paper className={classes.mainPaper}>
        <Typography component="p">
          Calculation
        </Typography>
        <Paper className={classes.tablePaper}>
          <Table className={classes.table} size="small">
            <TableHead>
              <TableRow>
                <TableCell className={classes.yearCol} align="right">Year</TableCell>
                <TableCell align="right">FCF * Growth rate</TableCell>
                <TableCell align="right">NPV FCF</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {val.map((v) => (
                <TableRow key={v.year}>
                  <TableCell align="right">{v.year}</TableCell>
                  <TableCell align="right">{v.fcf.toFixed(2)}</TableCell>
                  <TableCell align="right">{v.npv.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        <Grid container>

          <Grid item xs={6}>
            <Typography className={classes.alignRight}>
              {'Total NPV FVF: '}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classes.alignRight}>
              {/* {(val.reduce((total, n) => total + n.npv, 0)).toFixed(2)} */}
              {totalNPV.toFixed(2)}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography className={classes.alignRight}>
              Year 10 FCF value
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classes.alignRight}>
              {val.length >= 10 && (val[9].npv * valuationLastFCF).toFixed(2)}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography className={classes.alignRight}>
              {'Cash on Hand: '}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classes.alignRight}>
              {totalCash.toFixed(2)}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography className={classes.alignRight}>
              {'Total Debt: '}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classes.alignRight}>
              {totalDebt.toFixed(2)}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography className={classes.alignRight}>
              {'Company value: '}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classes.alignRight}>
              {presentVal.toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

DCFCalc.propTypes = {
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
