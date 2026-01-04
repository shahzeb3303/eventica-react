import './Hero.css';

const Hero = () => {
  const scrollToEvents = () => {
    const eventsSection = document.getElementById('events');
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-bg-image"></div>
      <div className="hero-overlay"></div>
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      <div className="hero-content">
        <h1 className="hero-title">
          Discover Amazing Events
          <span className="hero-subtitle">Create Unforgettable Memories</span>
        </h1>
        <p className="hero-description">
          Join thousands of people experiencing the best events in Pakistan.
          From music concerts to food festivals, we bring you closer to what matters.
        </p>
        <button className="hero-btn" onClick={scrollToEvents}>
          Explore Events
          <svg
            className="btn-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Hero;
