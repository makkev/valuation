import { combineReducers } from 'redux';

import appState from './reducer';
import priceEarningMultiple from './components/PriceEarningMultiple/reducer';
import dcf from './components/DCF/reducer';
import roe from './components/ROE/reducer';

const rootReducer = combineReducers({
  appState,
  priceEarningMultiple,
  dcf,
  roe,
});

export default rootReducer;
