const getHandler = store => (id, type) => () => {
  const action = { type, id };
  store.dispatch(action);
};

const Button = (value, handler) => {
  const button = document.createElement('button');
  button.innerHTML = value;

  button.addEventListener('click', () => handler())

  return button;
};

const Counter = (value, { inc, dec, del }) => {
  const counterDiv = document.createElement('div');
  counterDiv.innerHTML = `<span>${value}</span>`;

  counterDiv.append(
    Button('+', inc),
    Button('-', dec),
    Button('x', del)
  );

  return counterDiv;
};

module.exports = (store) => {
  const { counters, nextCounterId } = store.getState();

  const appDiv = document.getElementById('counters');
  appDiv.innerHTML = '';

  const handler = getHandler(store);

  appDiv.append(
    Button('Add counter', handler(nextCounterId, 'COUNTER_ADD')),
    ...counters.map(({ id, value }) =>
      Counter(value, {
        inc: handler(id, 'INCREMENT'),
        dec: handler(id, 'DECREMENT'),
        del: handler(id, 'COUNTER_REMOVE'),
      }))
  );
};
