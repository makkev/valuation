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
import DisplayVal from '../Common/DisplayVal';


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
    width: '80%',
    overflowX: 'auto',
    // marginBottom: theme.spacing(3),
  },
  table: {
    minWidth: 100,
  },
  yearCol: { width: '5%' },
}));

export default function DCFCalc(props) {
  const [valIn5, setValIn5] = useState(0);
  const [presentVal, setPresentVal] = useState(0);
  const [FCFval, setFCFVal] = useState([]);


  const classes = useStyles();

  const {
    inputs: {
      totalCash,
      totalDebt,
      freeCashFlow,
      sharesOutstanding,
      expectedGrowthRate,
      marginOfSafety,
      conservativeGrowthRate,
      growthDeclineRate,
      discountRate,
      valuationLastFCF,
    },
    setInputs,
  } = props;

  useEffect(() => {
    // Calculate FCF
    const calc = () => {
      const calcVal = [];
      let v = 0;
      for (let i = 0; i < 10; i += 1) {
        if (i === 0) {
          v = freeCashFlow * (1 + conservativeGrowthRate);
        } else {
          v = FCFval[i - 1].val
            * ((1 + (conservativeGrowthRate * ((1 - growthDeclineRate) ** ((i - 1))))));
        }
        calcVal.push({ year: i + 1, val: v.toFixed(2) });
      }
      return calcVal;
    };
    setFCFVal(calc());
  }, [
    freeCashFlow,
    conservativeGrowthRate,
    growthDeclineRate,
  ]);

  useEffect(() => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      conservativeGrowthRate: expectedGrowthRate * (1 - marginOfSafety),
    }));
  }, [expectedGrowthRate, marginOfSafety, setInputs]);

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
                <TableCell align="right">EPS * Growth rate</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {FCFval.map((v) => (
                <TableRow key={v.year}>
                  <TableCell align="right">{v.year}</TableCell>
                  <TableCell align="right">{v.val}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <Typography component="p">
          {`Value in 5 years: ${valIn5.toFixed(2)} `}
        </Typography>
        <Typography component="p">
          {`Present value: ${presentVal.toFixed(2)}`}
        </Typography>
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
  setInputs: PropTypes.func.isRequired,
};
