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

export default function PriceEarningMultipleCalc(props) {
  const [valIn5, setValIn5] = useState(0);
  const [presentVal, setPresentVal] = useState(0);
  const [val, setVal] = useState([]);


  const classes = useStyles();

  const {
    inputs: {
      eps,
      medianHistPE,
      expectGrowthRate,
      marginSafety,
      conservGrowthRt,
      growthDeclineRt,
      discountRt,
    },
    setInputs,
  } = props;


  useEffect(() => {
    const calc = () => {
      const calcVal = [];
      let v = 0;
      for (let i = 0; i < 5; i += 1) {
        if (i === 0) {
          v = (eps * (1 + conservGrowthRt)) * ((1 - growthDeclineRt) ** ((i + 1) - 1));
        } else {
          v = calcVal[i - 1].val * ((1 + (conservGrowthRt * ((1 - growthDeclineRt) ** ((i - 1))))));
        }
        calcVal.push({ year: i + 1, val: v.toFixed(2) });
      }
      return calcVal;
    };
    setVal(calc());
  }, [
    eps,
    medianHistPE,
    conservGrowthRt,
    growthDeclineRt,
    discountRt,
  ]);

  useEffect(() => {
    if (val[4] !== undefined) {
      setValIn5(val[4].val * medianHistPE);
      setPresentVal((val[4].val * medianHistPE) / ((1 + discountRt) ** 5));
    }
  }, [val, medianHistPE, discountRt]);

  useEffect(() => {
    // setInputs((prevInputs) => ({
    //   ...prevInputs,
    //   conservGrowthRt: expectGrowthRate * (1 - marginSafety),
    // }));
    setInputs('conservGrowthRt', expectGrowthRate * (1 - marginSafety));
  }, [expectGrowthRate, marginSafety]);

  console.log('val: ', val);
  console.log('valIn5: ', valIn5);
  console.log('present val: ', presentVal);

  return (
    <div className={classes.root}>
      {/* <div> */}
      {/* <PriceEarningMultipleVal presentVal={presentVal} /> */}
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
              {val.map((v) => (
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

PriceEarningMultipleCalc.propTypes = {
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
