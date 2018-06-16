const addHandlerToButton = (button, type, id, store) => {
  button.addEventListener('click', () => {
    const action = { type, id };
    store.dispatch(action);
  });
};

const getHandlers = store => id => ({
  add: (button) => addHandlerToButton(button, 'COUNTER_ADD', id, store),
  del: (button) => addHandlerToButton(button, 'COUNTER_REMOVE', id, store),
  inc: (button) => addHandlerToButton(button, 'INCREMENT', id, store),
  dec: (button) => addHandlerToButton(button, 'DECREMENT', id, store),
});

const createButton = (type, id, handler) => {
  value = {
    inc: '+',
    dec: '-',
    del: 'x',
  };

  const button = document.createElement('button');
  button.id = `${type}-${id}`;
  button.innerHTML = value[type];

  handler(button);

  return button;
}

const createCounterNode = (counter, handlers) => {
  const { id, value } = counter;

  const handlersWithId = handlers(id);

  const counterDiv = document.createElement('div');
  counterDiv.id = `counter-${id}`;
  counterDiv.innerHTML = `<span id="value-${id}">${value}</span>`;

  ['dec', 'inc', 'del'].map(type => createButton(type, id, handlersWithId[type]))
    .forEach(button => counterDiv.append(button));

  return counterDiv;
};

module.exports = (store) => {
  const { counters, nextCounterId } = store.getState();
  
  const appDiv = document.querySelector('.counters');
  appDiv.innerHTML = `<button id="add-counter">Add counter</button>
  <div id="counters"></div>`;

  const handlers = getHandlers(store);

  const addCounterButton = document.getElementById('add-counter');
  
  handlers(nextCounterId).add(addCounterButton);

  const countersDiv = document.getElementById('counters');
  countersDiv.innerHTML = '';

  counters.map(counter => createCounterNode(counter, handlers))
    .forEach(counterNode => countersDiv.append(counterNode));
};
