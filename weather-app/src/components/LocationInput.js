import React, { useState } from 'react';
import axios from 'axios';

const LocationInput = ({ setCoordinates }) => {
  const [location, setLocation] = useState('');

  const fetchCoordinates = async () => {
    const API_KEY = '52683068a416b04bc19c9966d33c268d';
    console.log(`Fetching coordinates for location: ${location}`);
    try {
      const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`);
      console.log('Geocoding API response:', response.data);
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setCoordinates({ lat, lon });
      } else {
        alert('Location not found');
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
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
