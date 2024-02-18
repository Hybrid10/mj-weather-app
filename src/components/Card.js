import React, { useState } from 'react';
import './Card.css';

import data from '../data.json'; // Import the country data

const Card = ({ weatherData, children }) => {
  const [countryData, setCountryData] = useState(null); // State to store country data

  const getTemperatureIcon = (temperature) => {
    if (temperature < 0) {
      return '❄️'; // Cold (below freezing)
    } else if (temperature >= 0 && temperature < 10) {
      return '🌡️'; // Cool
    } else if (temperature >= 10 && temperature < 20) {
      return '☀️'; // Moderate
    } else {
      return '🔥'; // Hot
    }
  };

  const getWindIcon = (windSpeed) => {
    if (windSpeed < 2) {
      return '🌬️'; // Calm
    } else if (windSpeed >= 2 && windSpeed < 5) {
      return '💨'; // Light Breeze
    } else if (windSpeed >= 5 && windSpeed < 10) {
      return '🌫️'; // Gentle Breeze
    } else {
      return '🌪️'; // Strong Wind
    }
  };

  const getHumidityIcon = (humidity) => {
    if (humidity < 30) {
      return '🏝️'; // Dry
    } else if (humidity >= 30 && humidity < 60) {
      return '💦'; // Comfortable
    } else {
      return '💧'; // Humid
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>
          {weatherData ? `${weatherData.name}, ${weatherData.sys ? weatherData.sys.country : ''}` : 'Weather App'}
        </h2>
        <span className="weather-icon" role="img" aria-label="Weather Icon">
          {weatherData ? getTemperatureIcon(weatherData.main ? weatherData.main.temp : 0) : '☀️'}
        </span>
      </div>
      <div className="card-content">
        <div className="search-field">
          {children} {/* Render children (SearchField) */}
        </div>
        {weatherData ? (
          <>
            <p>
              <span className="weather-icon" role="img" aria-label="Temperature Icon">
                {getTemperatureIcon(weatherData.main ? weatherData.main.temp : 0)}
              </span>
              Temperature: {weatherData.main ? `${weatherData.main.temp}°C` : 'N/A'}
            </p>
            <p>
              <span className="weather-icon" role="img" aria-label="Wind Icon">
                {getWindIcon(weatherData.wind ? weatherData.wind.speed : 0)}
              </span>
              Wind Speed: {weatherData.wind ? `${weatherData.wind.speed} m/s` : 'N/A'}
            </p>
            <p>
              <span className="weather-icon" role="img" aria-label="Humidity Icon">
                {getHumidityIcon(weatherData.main ? weatherData.main.humidity : 0)}
              </span>
              Humidity: {weatherData.main ? `${weatherData.main.humidity}%` : 'N/A'}
            </p>
            {/* Display the flag */}
            {weatherData.sys && weatherData.sys.country && (
              <img
                className="country-flag"
                src={`https://flagcdn.com/${weatherData.sys.country.toLowerCase()}.svg`}
                alt="Country Flag"
              />
            )}
          </>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default Card;
