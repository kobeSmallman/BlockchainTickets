// blockchain-tickets-ui/src/components/SeatMap/index.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const SeatMap = ({ eventId, onSeatSelect, selectedSeats }) => {
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch seat data for the event
  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await axios.get(`/api/events/${eventId}/seats`);
        setSeats(response.data);
      } catch (error) {
        console.error('Error fetching seat data:', error);
        setError('Failed to load seat map.');
      } finally {
        setLoading(false);
      }
    };
    fetchSeats();
  }, [eventId]);

  if (loading) {
    return <p>Loading seat map...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="seat-map">
      {seats.map((seatRow, rowIndex) => (
        <div key={rowIndex} className="seat-row">
          {seatRow.map((seat) => (
            <div
              key={seat.id}
              className={`seat ${
                seat.isAvailable
                  ? selectedSeats.includes(seat.id)
                    ? 'selected'
                    : ''
                  : 'unavailable'
              }`}
              onClick={() => seat.isAvailable && onSeatSelect(seat.id)}
            >
              {seat.label}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SeatMap;
