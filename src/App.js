import React, { useState } from 'react';
import WeatherForecastApp from './components/Forecast';
import StudentSafetyAdvisory from './components/HurricanePredictor';
import AirQualitySafety from './components/AirQuality';
import '@fontsource/silkscreen';

const App = () => {
  const [userInput, setUserInput] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = '37ac4fd1361b4a5798f10845230612';
  const apiUrl = 'http://api.weatherapi.com/v1/forecast.json';

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`${apiUrl}?key=${apiKey}&q=${userInput}&days=7&aqi=yes&alerts=yes`);
      const data = await response.json();
      console.log(data["Location"])
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
      <div
          style={{
            backgroundColor: '#1367AD',
            fontFamily: 'Silkscreen, monospace',
          }}
      >

        <div
            style={{
              textAlign: 'center',
              padding: '20px',
              fontFamily: 'Montserrat, sans-serif',
            }}
        >
          <h1
              style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: 'white',
              }}
          >
            Weather App
          </h1>
          <form onSubmit={handleSubmit}>
            <label>
              Enter City:
              <input type="text" value={userInput} onChange={handleInputChange} />
            </label>
            <button type="submit">Get Weather</button>
          </form>

          <WeatherForecastApp userInput={userInput} weatherData={weatherData} />
          <StudentSafetyAdvisory weatherData={weatherData} />
          <AirQualitySafety weatherData={weatherData} />

        </div>
      </div>
  );
};

export default App;
