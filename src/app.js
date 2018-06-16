const redux = require('redux');
const reducer = require('./reducer');
const render = require('./render');

module.exports = () => {
  const initialState = { nextCounterId: 0, counters: [] }

  const store = redux.createStore(reducer, initialState);
  
  const renderWithStore = () => render(store);
  
  store.subscribe(renderWithStore);

  render(store);
};
