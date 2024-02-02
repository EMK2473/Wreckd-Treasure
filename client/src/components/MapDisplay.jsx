// MapDisplay.jsx
import React from 'react';

const MapDisplay = () => {
  return (
    <div className="map-container">
      <iframe
        title="Shipwreck Map"
        src="https://www.google.com/maps/d/u/0/embed?mid=1MjRjm3HCjM8csJfwzMeZ4db0yzBw5ms&ehbc=2E312F"
        width="640"
        height="480"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default MapDisplay;
