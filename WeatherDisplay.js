import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherDisplay = ({ coordinates }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const API_KEY = 'YOUR_WEATHER_API_KEY';
      const { lat, lon } = coordinates;
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
      setWeather(response.data);
    };

    if (coordinates) {
      fetchWeather();
    }
  }, [coordinates]);

  return (
    <div>
      {weather ? (
        <div>
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>{Math.round(weather.main.temp - 273.15)}°C</p>
        </div>
      ) : (
        <p>No weather data available</p>
      )}
    </div>
  );
};

export default WeatherDisplay;
