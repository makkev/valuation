import { combineReducers } from 'redux';

import appState from './reducer';
import priceEarningMultiple from './components/PriceEarningMultiple/reducer';
import dcf from './components/DCF/reducer';

const rootReducer = combineReducers({
  appState,
  priceEarningMultiple,
  dcf,
});

export default rootReducer;
