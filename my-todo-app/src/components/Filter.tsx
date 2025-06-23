/******************************************************
 *                     Santosh Chandra Shekhar        *
 *                      To-Do App Component           *
 ******************************************************/
import React from 'react';

interface FilterProps {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

const Filter: React.FC<FilterProps> = ({ filter, setFilter }) => {
  return (
    <div className="filter-container">
      <button 
        onClick={() => setFilter('all')} 
        disabled={filter === 'all'}
      >
        All
      </button>
      <button 
        onClick={() => setFilter('completed')} 
        disabled={filter === 'completed'}
      >
        Completed
      </button>
      <button 
        onClick={() => setFilter('pending')} 
        disabled={filter === 'pending'}
      >
        Pending
      </button>
    </div>
  );
};

export default Filter;