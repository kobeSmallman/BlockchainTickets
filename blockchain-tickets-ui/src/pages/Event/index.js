// blockchain-tickets-ui/src/pages/Event/index.js

import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  // Fetch event categories from the database
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/event-categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
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
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    setPage(1); // Reset to first page on filter change
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

  return (
    <Layout>
      <div className="event-page">
        {/* Categories Section */}
        <section className="categories">
          <h2>Select Categories</h2>
          <div className="categories__grid">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`category-card ${
                  selectedCategories.includes(category.id) ? 'selected' : ''
                }`}
                onClick={() => handleCategorySelection(category.id)}
              >
                <img src={category.iconUrl} alt={category.name} />
                <p>{category.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Filters Section */}
        <section className="filters">
          <h2>Filter Events</h2>
          <div className="filters__controls">
            <div className="filter-control">
              <label htmlFor="dateStart">Start Date:</label>
              <input
                type="date"
                id="dateStart"
                name="dateRange.start"
                value={filters.dateRange.start}
                onChange={(e) =>
                  setFilters((prevFilters) => ({
                    ...prevFilters,
                    dateRange: {
                      ...prevFilters.dateRange,
                      start: e.target.value,
                    },
                  }))
                }
              />
            </div>
            <div className="filter-control">
              <label htmlFor="dateEnd">End Date:</label>
              <input
                type="date"
                id="dateEnd"
                name="dateRange.end"
                value={filters.dateRange.end}
                onChange={(e) =>
                  setFilters((prevFilters) => ({
                    ...prevFilters,
                    dateRange: {
                      ...prevFilters.dateRange,
                      end: e.target.value,
                    },
                  }))
                }
              />
            </div>
            <div className="filter-control">
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Enter location"
                value={filters.location}
                onChange={handleFilterChange}
              />
            </div>
            <div className="filter-control">
              <label htmlFor="priceMin">Price Range:</label>
              <input
                type="number"
                id="priceMin"
                name="priceMin"
                placeholder="Min"
                value={filters.priceRange[0]}
                onChange={(e) =>
                  setFilters((prevFilters) => ({
                    ...prevFilters,
                    priceRange: [Number(e.target.value), prevFilters.priceRange[1]],
                  }))
                }
              />
              <input
                type="number"
                id="priceMax"
                name="priceMax"
                placeholder="Max"
                value={filters.priceRange[1]}
                onChange={(e) =>
                  setFilters((prevFilters) => ({
                    ...prevFilters,
                    priceRange: [prevFilters.priceRange[0], Number(e.target.value)],
                  }))
                }
              />
            </div>
            <div className="filter-control">
              <label htmlFor="keywords">Keywords:</label>
              <input
                type="text"
                id="keywords"
                name="keywords"
                placeholder="Search events"
                value={filters.keywords}
                onChange={handleFilterChange}
              />
            </div>
          </div>
        </section>

        {/* Event Listings */}
        <section className="event-listings">
          <h2>Events</h2>
          <div className="events__grid">
            {events.map((event) => (
              <div key={event.id} className="event-card" onClick={() => handleEventClick(event.id)}>
                <img src={event.imageUrl} alt={event.name} />
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
                  <button className="btn btn--primary">View Details</button>
                  <button className="btn btn--secondary">Add to Wishlist</button>
                </div>
              </div>
            ))}
            {loadingEvents && <p>Loading more events...</p>}
            {!hasMoreEvents && <p>No more events to load.</p>}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default EventPage;
