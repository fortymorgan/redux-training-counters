const redux = require('redux');
const reducers = require('./reducer');
const render = require('./render');

module.exports = () => {
  const combinedReducers = redux.combineReducers(reducers);

  const store = redux.createStore(combinedReducers);
  
  const renderWithStore = () => render(store);
  
  store.subscribe(renderWithStore);

  renderWithStore();
};
