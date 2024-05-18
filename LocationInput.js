import React, { useState } from 'react';
import axios from 'axios';

const LocationInput = ({ setCoordinates }) => {
  const [location, setLocation] = useState('');

  const fetchCoordinates = async () => {
    const API_KEY = 'YOUR_GEOCODING_API_KEY';
    const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`);
    const { lat, lon } = response.data[0];
    setCoordinates({ lat, lon });
  };

  return (
    <div>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={fetchCoordinates}>Get Weather</button>
    </div>
  );
};

export default LocationInput;
