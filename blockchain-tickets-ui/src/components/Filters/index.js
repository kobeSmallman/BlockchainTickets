// blockchain-tickets-ui/src/components/Filters/index.js

import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.css';

const Filters = ({ filters, onFilterChange, onClearFilters }) => {
  const handleDateChange = (date, name) => {
    onFilterChange({
      target: {
        name: name,
        value: date,
      },
    });
  };

  return (
    <div className="filters">
      <h2>Filter Events</h2>
      <div className="filters__controls">
        <div className="filter-control">
          <label>Start Date:</label>
          <DatePicker
            selected={filters.dateRange.start}
            onChange={(date) => handleDateChange(date, 'dateStart')}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select start date"
          />
        </div>
        <div className="filter-control">
          <label>End Date:</label>
          <DatePicker
            selected={filters.dateRange.end}
            onChange={(date) => handleDateChange(date, 'dateEnd')}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select end date"
          />
        </div>
        <div className="filter-control">
          <label>Location:</label>
          <input
            type="text"
            name="location"
            placeholder="Enter location"
            value={filters.location}
            onChange={onFilterChange}
          />
        </div>
        <div className="filter-control">
          <label>Price Range:</label>
          <div className="price-range">
            <input
              type="number"
              name="priceMin"
              placeholder="Min"
              value={filters.priceRange[0]}
              onChange={(e) =>
                onFilterChange({
                  target: { name: 'priceMin', value: e.target.value },
                })
              }
            />
            <span> - </span>
            <input
              type="number"
              name="priceMax"
              placeholder="Max"
              value={filters.priceRange[1]}
              onChange={(e) =>
                onFilterChange({
                  target: { name: 'priceMax', value: e.target.value },
                })
              }
            />
          </div>
        </div>
        <div className="filter-control">
          <label>Keywords:</label>
          <input
            type="text"
            name="keywords"
            placeholder="Search events"
            value={filters.keywords}
            onChange={onFilterChange}
          />
        </div>
        <button className="btn btn--secondary" onClick={onClearFilters}>
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default Filters;
