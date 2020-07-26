import React from 'react';
import { useDispatch } from 'react-redux';
import { updateFilter } from '../reducers/filterReducer';

const Filter = () => {
  const dispatch = useDispatch();

  const handleFilter = (event) => {
    event.preventDefault();
    dispatch(updateFilter(event.target.value));
  };

  return (
    <div>
      filter
      <form>
        <input name="filter" onChange={handleFilter} />
      </form>
    </div>
  );
};

export default Filter;
