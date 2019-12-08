import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';
import PriceEarningMultiple from './components/PriceEarningMultiple/PriceEarningMultiple';

const store = createStore(
  rootReducer,
  {}, // the initial state here, if you have one
  composeWithDevTools(),
);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <PriceEarningMultiple />
      </div>
    </Provider>
  );
}

export default App;
