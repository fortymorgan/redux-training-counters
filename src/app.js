const redux = require('redux');
const reducers = require('./reducer');
const render = require('./render');

module.exports = () => {
  const combinedReducers = redux.combineReducers(reducers);

  // const store = redux.createStore(combinedReducers);

  const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
  const devtoolMiddleware = ext && ext();

  const store = redux.createStore(
    combinedReducers,
    devtoolMiddleware
  )
  
  const renderWithStore = () => render(store);
  
  store.subscribe(renderWithStore);

  renderWithStore();
};
