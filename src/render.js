const handlerForButton = (type, id, store) => () => {
  const action = { type, id };
  store.dispatch(action);
};

const getHandlers = store => id => ({
  add: handlerForButton('COUNTER_ADD', id, store),
  del: handlerForButton('COUNTER_REMOVE', id, store),
  inc: handlerForButton('INCREMENT', id, store),
  dec: handlerForButton('DECREMENT', id, store),
});

const createButton = (value, handler) => {
  const button = document.createElement('button');
  button.innerHTML = value;

  button.addEventListener('click', () => handler())

  return button;
}

const createCounterNode = (counter, handlers) => {
  const { id, value } = counter;

  const handlersWithId = handlers(id);

  const counterDiv = document.createElement('div');
  counterDiv.innerHTML = `<span>${value}</span>`;

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
