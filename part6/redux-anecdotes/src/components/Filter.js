import React from 'react';
import { connect } from 'react-redux';
import { updateFilter } from '../reducers/filterReducer';

const Filter = (props) => {
  const handleFilter = (event) => {
    event.preventDefault();
    props.updateFilter(event.target.value);
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

const ConnectedFilter = connect(null, { updateFilter })(Filter);

export default ConnectedFilter;
