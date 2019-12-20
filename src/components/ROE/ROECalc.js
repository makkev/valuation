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
 * TODO: delete not needed
 * Calculates NPV given an array of FCFs
 * @param {array} FCF
 * @param {number} discountRate
 * @returns {array} NPV
 */

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

const YEARS = 10;

const calcVal = (n, shareholdersEquity, conservativeGrowthRate, sharesOutstanding) => {
  const val = [];
  let holdersEq = 0;
  for (let i = 0; i < n; i += 1) {
    if (i === 0) {
      holdersEq = (shareholdersEquity * (1 + conservativeGrowthRate)) / sharesOutstanding;
    } else {
      holdersEq = val[i - 1].holdersEq * (1 + conservativeGrowthRate);
    }
    val.push({
      year: i + 1,
      holdersEq,
    });
  }
  return val;
};

export default function DCFCalc(props) {
  const [companyVal, setCompanyVal] = useState(0);
  const [val, setVal] = useState([]);
  const [totalNPV, setTotalNPV] = useState(0);
  const [year10FCF, setYear10FCF] = useState(0);

  const classes = useStyles();

  const {
    inputs: {
      shareholdersEquity,
      price,
      ROE,
      sharesOutstanding,
      dividendYield,
      dividendPayoutRatio,
      marginOfSafety,
      conservativeGrowthRate,
      discountRate,
    },
    setInput,
  } = props;

  useEffect(() => {
    setVal(calcVal(YEARS, shareholdersEquity, conservativeGrowthRate, sharesOutstanding));
  }, [shareholdersEquity, conservativeGrowthRate, sharesOutstanding]);

  return (
    <div className={classes.root}>
      {/* <div> */}
      <DisplayVal presentVal={companyVal / sharesOutstanding} />
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
                <TableCell align="right">NPV FCF</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {val.map((v) => (
                <TableRow key={v.year}>
                  <TableCell align="right">{v.year}</TableCell>
                  <TableCell align="right">{v.holdersEq.toFixed(2)}</TableCell>
                  {/* <TableCell align="right">{v.npv.toFixed(2)}</TableCell> */}
                  <TableCell align="right">0</TableCell>
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
              {/* {totalNPV.toFixed(2)} */}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography className={classes.alignRight}>
              {'Required value: '}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classes.alignRight}>
              {/* {val.length >= 10 && (val[9].npv * valuationLastFCF).toFixed(2)} */}
              {/* {year10FCF.toFixed(2)} */}
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
              {/* {totalCash.toFixed(2)} */}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography className={classes.alignRight}>
              {'NPV dividends: '}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classes.alignRight}>
              {/* {totalDebt.toFixed(2)} */}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography className={classes.alignRight}>
              {'Intrinsic value: '}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classes.alignRight}>
              {/* {companyVal.toFixed(2)} */}
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
  setInput: PropTypes.func.isRequired,
};
