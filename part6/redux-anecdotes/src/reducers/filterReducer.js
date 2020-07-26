const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'UPDATE_FILTER':
      return action.filter;
    default:
      return state;
  }
};

export const updateFilter = (filter) => ({
  type: 'UPDATE_FILTER',
  filter,
});

export default filterReducer;
