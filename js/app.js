const redux = require('redux');
const reducer = require('./reducer');
const render = require('./render');

const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__;

module.exports = () => {
  const store = redux.createStore(reducer, reduxDevtools && reduxDevtools());
  
  const renderWithStore = render(store);
  
  store.subscribe(renderWithStore);
  
  let nextCounterId = 0;
  
  const addCounterButton = document.getElementById('add-counter');
  
  addCounterButton.addEventListener('click', () => {
    const action = { type: 'COUNTER_ADD', id: nextCounterId++ };
    store.dispatch(action);
  });
};
