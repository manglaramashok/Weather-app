import React from "react";
import { motion } from "framer-motion"; // ✅ ADDED

const Weather = ({ weather }) => {
  return (
    <motion.div
      className="card p-3 mb-3"
      initial={{ opacity: 0, y: 30 }}     // ✅ animation start
      animate={{ opacity: 1, y: 0 }}      // ✅ animation end
      transition={{ duration: 0.6 }}      // ✅ smooth
    >
      <h2>{weather.name}</h2>
      <p>🌡 Temperature: {weather.main.temp}°C</p>
      <p>☁ Condition: {weather.weather[0].description}</p>
      <p>💨 Wind Speed: {weather.wind.speed} m/s</p>
    </motion.div>
  );
};

export default Weather;