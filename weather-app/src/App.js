import React, { useState } from 'react';
import LocationInput from './components/LocationInput';
import WeatherDisplay from './components/WeatherDisplay';
import NewsDisplay from './components/NewsDisplay';
import './App.css';

const App = () => {
  const [coordinates, setCoordinates] = useState(null);

  return (
    <div className="App">
      <h1>Weather and News App</h1>
      <LocationInput setCoordinates={setCoordinates} />
      {coordinates && <WeatherDisplay coordinates={coordinates} />}
      <NewsDisplay />
    </div>
  );
};

export default App;
