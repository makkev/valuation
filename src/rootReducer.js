import { combineReducers } from 'redux';

import appState from './reducer';
import priceEarningMultiple from './components/PriceEarningMultiple/reducer';

const rootReducer = combineReducers({
  appState,
  priceEarningMultiple,
});

export default rootReducer;
