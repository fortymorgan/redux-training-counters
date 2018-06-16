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

const createButton = (value, handler) => {
  const button = document.createElement('button');
  button.innerHTML = value;

  handler(button);

  return button;
}

const createCounterNode = (counter, handlers) => {
  const { id, value } = counter;

  const handlersWithId = handlers(id);

  const counterDiv = document.createElement('div');
  counterDiv.id = `counter-${id}`;
  counterDiv.innerHTML = `<span id="value-${id}">${value}</span>`;

  buttonsTemplate = [
    {
      type: 'inc',
      value: '+',
    },
    {
      type: 'dec',
      value: '-',
    },
    {
      type: 'del',
      value: 'x',
    },
  ];

  buttonsTemplate.map(({ type, value }) => createButton(value, handlersWithId[type]))
    .forEach(button => counterDiv.append(button));

  return counterDiv;
};

module.exports = (store) => {
  const { counters, nextCounterId } = store.getState();
  
  const appDiv = document.getElementById('counters');
  appDiv.innerHTML = '';

  const handlers = getHandlers(store);

  const addCounterButton = createButton('Add counter', handlers(nextCounterId).add)
  appDiv.append(addCounterButton);

  counters.map(counter => createCounterNode(counter, handlers))
    .forEach(counterNode => appDiv.append(counterNode));
};
