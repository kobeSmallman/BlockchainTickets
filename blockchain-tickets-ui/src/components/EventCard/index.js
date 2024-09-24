// blockchain-tickets-ui/src/components/EventCard/index.js

import React from 'react';
import './styles.css';

const EventCard = ({ event, onClick, onAddToWishlist }) => {
  return (
    <div className="event-card">
      <img src={event.imageUrl} alt={event.name} onClick={() => onClick(event.id)} />
      <div className="event-card__info">
        <h3>{event.name}</h3>
        <p>{event.description}</p>
        <p>
          {event.date} at {event.time}
        </p>
        <p>{event.location}</p>
        <p>Starting from ${event.price}</p>
      </div>
      <div className="event-card__actions">
        <button className="btn btn--primary" onClick={() => onClick(event.id)}>
          View Details
        </button>
        <button className="btn btn--secondary" onClick={() => onAddToWishlist(event.id)}>
          Add to Wishlist
        </button>
      </div>
    </div>
  );
};

export default EventCard;
