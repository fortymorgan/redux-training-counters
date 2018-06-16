const actionHandler = (type, id, store) => () => {
  const action = { type, id };
  store.dispatch(action);
};

const getHandler = store => id => type => actionHandler(type, id, store);

const Button = (value, handler) => {
  const button = document.createElement('button');
  button.innerHTML = value;

  button.addEventListener('click', () => handler())

  return button;
}

const Counter = (counter, handlerTemplate) => {
  const { value } = counter;

  const counterDiv = document.createElement('div');
  counterDiv.innerHTML = `<span>${value}</span>`;

  counterDiv.append(Button('+', handlerTemplate('INCREMENT')));
  counterDiv.append(Button('-', handlerTemplate('DECREMENT')));
  counterDiv.append(Button('x', handlerTemplate('COUNTER_REMOVE')));

  return counterDiv;
};

module.exports = (store) => {
  const { counters, nextCounterId } = store.getState();
  
  const appDiv = document.getElementById('counters');
  appDiv.innerHTML = '';

  const handler = getHandler(store);

  const addCounterButton = Button('Add counter', handler(nextCounterId)('COUNTER_ADD'));
  appDiv.append(addCounterButton);

  counters.map(counter => {
    const handlerTemplate = handler(counter.id);
    return Counter(counter, handlerTemplate);
  }).forEach(counterNode => appDiv.append(counterNode));
};
