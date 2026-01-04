import { useState, useEffect } from 'react';
import { eventsData } from '../data/eventsData';
import './Events.css';

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEvents, setFilteredEvents] = useState(eventsData);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const filtered = eventsData.filter(event =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(filtered);
    setCurrentIndex(0);
  }, [searchTerm]);

  useEffect(() => {
    if (filteredEvents.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % filteredEvents.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [filteredEvents]);

  const handlePrev = () => {
    setCurrentIndex(prev =>
      prev === 0 ? filteredEvents.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % filteredEvents.length);
  };

  const getVisibleCards = () => {
    if (filteredEvents.length === 0) return [];
    if (filteredEvents.length === 1) return [filteredEvents[0]];
    if (filteredEvents.length === 2) return filteredEvents;

    const cards = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % filteredEvents.length;
      cards.push(filteredEvents[index]);
    }
    return cards;
  };

  const visibleCards = getVisibleCards();

  return (
    <section id="events" className="events-section">
      <div className="events-container">
        <div className="events-header">
          <h2 className="section-title">Featured Events</h2>
          <p className="section-subtitle">
            Discover extraordinary experiences happening around you
          </p>
        </div>

        <div className="search-container">
          <div className="search-wrapper">
            <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search events by name, location, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="no-results">
            <p>No events found matching your search.</p>
          </div>
        ) : (
          <div className="slider-container">
            <button className="slider-btn prev-btn" onClick={handlePrev}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="events-slider">
              {visibleCards.map((event, idx) => (
                <div
                  key={`${event.id}-${idx}`}
                  className={`event-card ${idx === 1 ? 'center' : ''}`}
                >
                  <div className="event-image-container">
                    <img src={event.image} alt={event.name} className="event-image" />
                    <div className="event-category">{event.category}</div>
                  </div>
                  <div className="event-content">
                    <h3 className="event-name">{event.name}</h3>
                    <div className="event-details">
                      <div className="event-info">
                        <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{event.date}</span>
                      </div>
                      <div className="event-info">
                        <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{event.time}</span>
                      </div>
                      <div className="event-info">
                        <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <p className="event-description">{event.description}</p>
                    <button className="register-btn">Register Now</button>
                  </div>
                </div>
              ))}
            </div>

            <button className="slider-btn next-btn" onClick={handleNext}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        <div className="slider-dots">
          {filteredEvents.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
