import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './components/Card';
import SearchField from './components/SearchField';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (city) {
      const API_KEY = 'xxx';

      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error);
        });
    }
  }, [city]);

  // Use geolocation to get the user's current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        // Fetch weather data based on geolocation coordinates
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
          .then((response) => response.json())
          .then((data) => {
            setCity(data.name); // Set the city based on user's location
            setWeatherData(data);
          })
          .catch((error) => {
            console.error('Error fetching weather data:', error);
          });
      },
      (error) => {
        console.error('Error getting geolocation:', error);
      }
    );
  }, []); // Empty dependency array to run this effect only once

  return (
    <div className="App">
      <div className="centered">
        <Card weatherData={weatherData}>
          <SearchField onSearch={setCity} />
        </Card>
      </div>
    </div>
  );
}

export default App;
