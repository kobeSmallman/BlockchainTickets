// blockchain-tickets-ui/src/components/CategoryCard/index.js

import React from 'react';
import './styles.css';

const CategoryCard = ({ category, isSelected, onSelect }) => {
  return (
    <div
      className={`category-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(category.id)}
    >
      <img src={category.iconUrl} alt={category.name} />
      <p>{category.name}</p>
    </div>
  );
};

export default CategoryCard;
