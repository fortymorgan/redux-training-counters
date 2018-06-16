module.exports = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      const incrementId = action.id;
      return { nextCounterId: state.nextCounterId, counters: state.counters.map(elem => {
        const { id } = elem;
        const value = id === incrementId ? elem.value + 1 : elem.value;
        return { id, value };
      })};
    case 'DECREMENT':
      const decrementId = action.id;
      return { nextCounterId: state.nextCounterId, counters: state.counters.map(elem => {
        const { id } = elem;
        const value = id === decrementId ? elem.value - 1 : elem.value;
        return { id, value };
      })};
    case 'COUNTER_ADD':
      const addId = action.id;
      return { nextCounterId: state.nextCounterId + 1, counters: [...state.counters, { id: addId, value: 0 }] };
    case 'COUNTER_REMOVE':
      const removeId = action.id;
      return { nextCounterId: state.nextCounterId, counters: state.counters.filter(elem => elem.id !== removeId) };
    default:
      return state;
  }
}
