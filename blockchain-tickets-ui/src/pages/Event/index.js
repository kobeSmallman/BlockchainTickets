// blockchain-tickets-ui/src/pages/Event/index.js

import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CategoryCard from '../../components/CategoryCard';
import EventCard from '../../components/EventCard';
import Filters from '../../components/Filters';
import './styles.css';

const EventPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({
    dateRange: { start: '', end: '' },
    location: '',
    priceRange: [0, 1000],
    keywords: '',
  });
  const [page, setPage] = useState(1);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [hasMoreEvents, setHasMoreEvents] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch event categories from the database
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/event-categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to load categories.');
      }
    };
    fetchCategories();
  }, []);

  // Fetch events based on selected categories and filters
  useEffect(() => {
    const fetchEvents = async () => {
      setLoadingEvents(true);
      try {
        const response = await axios.get('/api/events', {
          params: {
            categories: selectedCategories,
            dateStart: filters.dateRange.start,
            dateEnd: filters.dateRange.end,
            location: filters.location,
            priceMin: filters.priceRange[0],
            priceMax: filters.priceRange[1],
            keywords: filters.keywords,
            page: page,
          },
        });
        if (page === 1) {
          setEvents(response.data.events);
        } else {
          setEvents((prevEvents) => [...prevEvents, ...response.data.events]);
        }
        setHasMoreEvents(response.data.events.length > 0);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Failed to load events.');
      } finally {
        setLoadingEvents(false);
      }
    };
    fetchEvents();
  }, [selectedCategories, filters, page]);

  // Handle category selection
  const handleCategorySelection = (categoryId) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId]
    );
    setPage(1); // Reset to first page on category change
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    if (name === 'dateStart' || name === 'dateEnd') {
      setFilters((prevFilters) => ({
        ...prevFilters,
        dateRange: {
          ...prevFilters.dateRange,
          [name === 'dateStart' ? 'start' : 'end']: value,
        },
      }));
    } else if (name === 'priceMin' || name === 'priceMax') {
      setFilters((prevFilters) => ({
        ...prevFilters,
        priceRange: [
          name === 'priceMin' ? Number(value) : prevFilters.priceRange[0],
          name === 'priceMax' ? Number(value) : prevFilters.priceRange[1],
        ],
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    }
    setPage(1);
  };

  // Clear Filters
  const handleClearFilters = () => {
    setFilters({
      dateRange: { start: '', end: '' },
      location: '',
      priceRange: [0, 1000],
      keywords: '',
    });
    setPage(1);
  };

  // Load more events when scrolling
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target.scrollingElement;
    if (scrollHeight - scrollTop === clientHeight && hasMoreEvents && !loadingEvents) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [hasMoreEvents, loadingEvents]);

  // Navigate to event details page
  const handleEventClick = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  // Add to Wishlist handler
  const handleAddToWishlist = (eventId) => {
    // Implement the logic to add the event to the user's wishlist
    console.log(`Event ${eventId} added to wishlist`);
  };

  return (
    <Layout>
      <div className="event-page">
        {/* Categories Section */}
        <section className="categories">
          <h2>Select Categories</h2>
          <div className="categories__grid">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                isSelected={selectedCategories.includes(category.id)}
                onSelect={handleCategorySelection}
              />
            ))}
          </div>
        </section>

        {/* Filters Section */}
        <Filters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />

        {/* Event Listings */}
        <section className="event-listings">
          <h2>Events</h2>
          {error && <p className="error-message">{error}</p>}
          <div className="events__grid">
            {events.length > 0 ? (
              events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onClick={handleEventClick}
                  onAddToWishlist={handleAddToWishlist}
                />
              ))
            ) : (
              <p>No events found matching your criteria.</p>
            )}
            {loadingEvents && <p>Loading more events...</p>}
            {!hasMoreEvents && !loadingEvents && <p>No more events to load.</p>}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default EventPage;
