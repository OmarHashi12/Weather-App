import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherDisplay = ({ coordinates }) => {
  const [weather, setWeather] = useState(null);
  const [hourly, setHourly] = useState(null);
  const [daily, setDaily] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const API_KEY = '52683068a416b04bc19c9966d33c268d';
      const { lat, lon } = coordinates;

      console.log(`Fetching weather for coordinates: ${lat}, ${lon}`);

      try {
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        console.log('Current weather response:', weatherResponse.data);
        setWeather(weatherResponse.data);

        const hourlyResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        console.log('Hourly forecast response:', hourlyResponse.data);
        setHourly(hourlyResponse.data);

        const dailyResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=7&appid=${API_KEY}`);
        console.log('Daily forecast response:', dailyResponse.data);
        setDaily(dailyResponse.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    if (coordinates) {
      fetchWeather();
    }
  }, [coordinates]);

  return (
    <div>
      {weather ? (
        <div>
          <h2>Current Weather in {weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>{Math.round(weather.main.temp - 273.15)}°C</p>
        </div>
      ) : (
        <p>Loading current weather...</p>
      )}
      {hourly && (
        <div>
          <h2>Hourly Forecast</h2>
          <ul>
            {hourly.list.slice(0, 24).map((item, index) => (
              <li key={index}>
                {new Date(item.dt * 1000).toLocaleTimeString()}: {item.weather[0].description}, {Math.round(item.main.temp - 273.15)}°C
              </li>
            ))}
          </ul>
        </div>
      )}
      {daily && (
        <div>
          <h2>Daily Forecast</h2>
          <ul>
            {daily.list.map((item, index) => (
              <li key={index}>
                {new Date(item.dt * 1000).toLocaleDateString()}: {item.weather[0].description}, {Math.round(item.temp.day - 273.15)}°C
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;
