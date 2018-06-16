const redux = require('redux');
const reducer = require('./reducer');

const getElement = (prefix, id) => document.getElementById(`${prefix}-${id}`);

const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__;

module.exports = () => {
  const store = redux.createStore(reducer, reduxDevtools && reduxDevtools());
  
  const render = () => {
    const countersDiv = document.getElementById('counters');
    countersDiv.innerHTML = '';

    const state = store.getState();
    console.log(state);

    state.forEach(element => {
      const { id, value } = element;

      const counter = document.createElement('div');
      counter.id = `counter-${id}`;

      counter.innerHTML = `<span id="value-${id}">${value}</span>
      <button id="dec-${id}">-</button>
      <button id="inc-${id}">+</button>
      <button id="del-${id}">x</button>`;

      countersDiv.appendChild(counter);

      const delButton = getElement('del', id);
      const decButton = getElement('dec', id);
      const incButton = getElement('inc', id);

      delButton.addEventListener('click', () => {
        const action = { type: 'COUNTER_REMOVE', id };
        store.dispatch(action);
      });

      decButton.addEventListener('click', () => {
        const action = { type: 'DECREMENT', id };
        store.dispatch(action);
      });

      incButton.addEventListener('click', () => {
        const action = { type: 'INCREMENT', id };
        store.dispatch(action);
      });
    })
  }
  
  store.subscribe(render);
  
  let nextCounterId = 0;
  
  const addCounterButton = document.getElementById('add-counter');
  
  addCounterButton.addEventListener('click', () => {
    const action = { type: 'COUNTER_ADD', id: nextCounterId++ };
    store.dispatch(action);
  });
};
