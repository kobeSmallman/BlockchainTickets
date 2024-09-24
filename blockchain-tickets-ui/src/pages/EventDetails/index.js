// blockchain-tickets-ui/src/pages/EventDetails/index.js

import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import SeatMap from '../../components/SeatMap';
import './styles.css';

const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch event details
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`/api/events/${eventId}`);
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event details:', error);
        setError('Failed to load event details.');
      } finally {
        setLoading(false);
      }
    };
    fetchEventDetails();
  }, [eventId]);

  // Handle seat selection
  const handleSeatSelection = (seatId) => {
    setSelectedSeats((prevSelected) =>
      prevSelected.includes(seatId)
        ? prevSelected.filter((id) => id !== seatId)
        : [...prevSelected, seatId]
    );
  };

  // Proceed to checkout
  const handleProceedToCheckout = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat.');
      return;
    }
    // Navigate to checkout page or handle checkout logic
    navigate('/checkout', { state: { eventId, selectedSeats } });
  };

  // Add to Wishlist
  const handleAddToWishlist = () => {
    // Implement the logic to add the event to the user's wishlist
    console.log(`Event ${eventId} added to wishlist`);
  };

  if (loading) {
    return (
      <Layout>
        <div className="event-details-page">
          <p>Loading event details...</p>
        </div>
      </Layout>
    );
  }

  if (error || !event) {
    return (
      <Layout>
        <div className="event-details-page">
          <p className="error-message">{error || 'Event not found.'}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="event-details-page">
        <div className="event-details">
          <div className="event-details__header">
            <img src={event.imageUrl} alt={event.name} className="event-image" />
            <div className="event-info">
              <h1>{event.name}</h1>
              <p>
                {event.date} at {event.time}
              </p>
              <p>{event.location}</p>
              <button className="btn btn--secondary" onClick={handleAddToWishlist}>
                Add to Wishlist
              </button>
            </div>
          </div>
          <div className="event-description">
            <h2>Description</h2>
            <p>{event.description}</p>
          </div>
        </div>

        {/* Seat Selection */}
        <div className="seat-selection">
          <h2>Select Your Seats</h2>
          <SeatMap eventId={eventId} onSeatSelect={handleSeatSelection} selectedSeats={selectedSeats} />
        </div>

        <div className="checkout-section">
          <p>
            Selected Seats: <strong>{selectedSeats.join(', ') || 'None'}</strong>
          </p>
          <button className="btn btn--primary" onClick={handleProceedToCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default EventDetails;
