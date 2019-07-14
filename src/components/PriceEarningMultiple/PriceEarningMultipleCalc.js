import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
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
  yearCol: { width: '5%'}
}));

function createData(year, val) {
  return { year, val };
}

const rows = [
  createData( 1, 123.00),
  createData( 2, 123.00),
  createData( 3, 123.00),
  createData( 4, 123.00),
  createData( 5, 123.00),
];


export default function PriceEarningMultipleCalc(props) {
  const [valIn5, setValIn5] = useState(0)
  const [presentVal, setPresentVal] = useState(0)
  const [val, setVal] = useState([]);





  const classes = useStyles();

  const { inputs: {
    eps,
    medianHistPE,
    expectGrowthRate,
    marginSafety,
    conservGrowthRt,
    growthDeclineRt,
    discountRt,
  } } = props;



  useEffect(() => {
    const calc = () => {
      let val = [];
      let v = 0;
      for (let i = 0; i < 5; i++) {
        if (i === 0) {
          v = (eps * (1 + conservGrowthRt)) * ((1 - growthDeclineRt) ** ((i + 1) - 1))
        }
        else {
          v = val[i - 1].val * ((1 + (conservGrowthRt * ((1 - growthDeclineRt) ** ((i - 1))))))
        }
        val.push({ year: i + 1, val: v.toFixed(2)})
      }
      return val;
    }
    setVal(calc());
  }, []);

  useEffect(() => {
    if (val[4] !== undefined) {
      setValIn5(val[4].val * medianHistPE);
      setPresentVal((val[4].val * medianHistPE) / ((1 + discountRt) ** 5))
    }
  });
  

  console.log('val: ', val);
  console.log('valIn5: ', valIn5);
  console.log('present val: ', presentVal);

  return (
    <div className={classes.root}>
    {/* <div> */}
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
              {val.map(v => (
                <TableRow key={v.year}>
                  <TableCell align="right">{v.year}</TableCell>
                  <TableCell align="right">{v.val}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <Typography component="p">
          {`Value in 5 years: ${valIn5} `}
        </Typography>
        <Typography component="p">
          {`Present value: ${presentVal}`}
        </Typography>
      </Paper>
    </div>
  );
}