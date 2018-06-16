const getElement = (prefix, id) => document.getElementById(`${prefix}-${id}`);

module.exports = (store) => {
  const state = store.getState();
  
  const appDiv = document.querySelector('.counters');
  appDiv.innerHTML = `<button id="add-counter">Add counter</button>
  <div id="counters"></div>`;

  const addCounterButton = document.getElementById('add-counter');
  
  addCounterButton.addEventListener('click', () => {
    const action = { type: 'COUNTER_ADD', id: state.nextCounterId };
    store.dispatch(action);
  });

  const countersDiv = document.getElementById('counters');
  countersDiv.innerHTML = '';

  console.log(state);

  state.counters.forEach(element => {
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
  });
}
