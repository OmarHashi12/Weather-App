import React, { useState } from 'react';
import LocationInput from './components/LocationInput';
import WeatherDisplay from './components/WeatherDisplay';
import './App.css';

const App = () => {
  const [coordinates, setCoordinates] = useState(null);

  return (
    <div className="App">
      <h1>Weather App</h1>
      <LocationInput setCoordinates={setCoordinates} />
      {coordinates && <WeatherDisplay coordinates={coordinates} />}
    </div>
  );
};

export default App;
