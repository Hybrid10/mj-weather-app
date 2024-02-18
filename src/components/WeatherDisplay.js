import React, { useEffect, useState } from 'react';

const WeatherDisplay = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (city) {
      const API_KEY = 'xxx';

      // Fetch weather data
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        .then((response) => response.json())
        .then((data) => {
          if (data.cod === '404') {
            setWeatherData(null);
          } else {
            setWeatherData(data);
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setWeatherData(null);
        });
    }
  }, [city]);

  if (!weatherData) {
    return (
      <div>
        <h2>Väder i {city}</h2>
        <p>No Result</p>
      </div>
    );
  }

  if (!weatherData.main || !weatherData.main.temp) {
    return (
      <div>
        <h2>Väder i {city}</h2>
        <p>No Result</p>
      </div>
    );
  }

  const temperature = weatherData.main.temp.toFixed(2);
  const unit = "°C";

  return (
    <div>
      <h2>Väder i {city}</h2>
      <p>
        <span className="weather-icon" role="img" aria-label="Temperature Icon">
          {getTemperatureIcon(weatherData.main.temp)}
        </span>
        Temperatur: {temperature} {unit}
      </p>
      <p>
        <span className="weather-icon" role="img" aria-label="Wind Icon">
          {getWindIcon(weatherData.wind.speed)}
        </span>
        Vind: {weatherData.wind.speed} m/s
      </p>
      <p>
        <span className="weather-icon" role="img" aria-label="Humidity Icon">
          {getHumidityIcon(weatherData.main.humidity)}
        </span>
        Luftfuktighet: {weatherData.main.humidity}%
      </p>
      {/* Display the flag */}
      {weatherData.sys && weatherData.sys.country && (
        <img src={`https://flagcdn.com/${weatherData.sys.country.toLowerCase()}.svg`} alt="Country Flag" />
      )}
    </div>
  );
};

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

export default WeatherDisplay;
