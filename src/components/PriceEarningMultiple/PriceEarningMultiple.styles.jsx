import { makeStyles } from '@material-ui/core/styles';

const usePriceEarningMultipleStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  heading: {
    marginLeft: theme.spacing(3),
  },
  body: {
    marginLeft: theme.spacing(3),
  },
}));

export const PriceEarningMultipleStyles = () => usePriceEarningMultipleStyles();
