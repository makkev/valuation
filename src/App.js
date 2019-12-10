import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';
import Home from './components/Home/Home';

const store = createStore(
  rootReducer,
  {}, // the initial state here, if you have one
  composeWithDevTools(),
);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Home />
      </div>
    </Provider>
  );
}

export default App;
