import React, { useState, useEffect } from "react";
import Weather from "./components/Weather";
import Forecast from "./components/Forecast";
import { fetchCurrentWeather, fetchForecast } from "./services/weatherService";
import { motion } from "framer-motion"; // ✅ ADDED
import "./App.css";

function App() {
  const [city, setCity] = useState("Jaipur");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState("");

  const searchWeather = async () => {
    try {
      setError("");
      const weatherData = await fetchCurrentWeather(city);
      const forecastData = await fetchForecast(city);
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast(null);
    }
  };

  const getLocationWeather = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        setError("");
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
        );
        const data = await response.json();
        setWeather(data);
        setForecast(null);
      } catch {
        setError("Unable to fetch location weather");
      }
    });
  };

  useEffect(() => {
    searchWeather();
  }, []);

  return (
    <motion.div
      className="container text-center mt-5"
      initial={{ opacity: 0 }}           // ✅ page fade
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="mb-4">🌦 Weather Forecast App</h1>

      {/* Search */}
      <div className="input-group mb-3 w-50 mx-auto">
        <input
          type="text"
          className="form-control"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <motion.button
          className="btn btn-primary"
          onClick={searchWeather}
          whileHover={{ scale: 1.05 }}    // ✅ hover animation
          whileTap={{ scale: 0.95 }}      // ✅ tap animation
        >
          Search
        </motion.button>
      </div>

      {/* Location Button */}
      <motion.button
        className="btn btn-success mb-3"
        onClick={getLocationWeather}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        📍 Use My Location
      </motion.button>

      {/* Error Animation */}
      {error && (
        <motion.div
          className="alert alert-danger"
          initial={{ x: -20 }}
          animate={{ x: [ -10, 10, -10, 10, 0 ] }} // ✅ shake
        >
          {error}
        </motion.div>
      )}

      {weather && <Weather weather={weather} />}
      {forecast && <Forecast forecast={forecast} />}
    </motion.div>
  );
}

export default App;