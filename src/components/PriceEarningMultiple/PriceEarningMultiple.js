import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch } from 'react-redux';
import PriceEarningMultipleInputs from './PriceEarningMultipleInputs';
import PriceEarningMultipleCalc from './PriceEarningMultipleCalc';
import { setInput } from './actions';
import { PriceEarningMultipleStyles } from './PriceEarningMultiple.styles';

function PriceEarningMultiple() {
  // const PriceEarningMultipleStyle = usePriceEarningMultipleStyles();
  const inputs = useSelector(state => state.priceEarningMultiple.inputs);
  const dispatch = useDispatch();

  const setInputs = (name, value) => {
    dispatch(setInput(name, value));
  };

  // const [inputs, setInputs] = useState({
  //   eps: 13.97,
  //   medianHistPE: 18.00,
  //   expectGrowthRate: 0.2,
  //   marginSafety: 0.25,
  //   conservGrowthRt: 0.15,
  //   growthDeclineRt: 0.05,
  //   discountRt: 0.09,
  // });

  return (
    <div className={PriceEarningMultipleStyles.root}>
      <Typography
        variant="h5"
        component="h3"
        className={PriceEarningMultipleStyles.heading}
      >
        Price Earning Multiple
      </Typography>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        className={PriceEarningMultipleStyles.body}
      >
        <PriceEarningMultipleInputs inputs={inputs} setInputs={setInputs} />
        <PriceEarningMultipleCalc inputs={inputs} setInputs={setInputs} />
      </Grid>
    </div>
  );
}

export default PriceEarningMultiple;
