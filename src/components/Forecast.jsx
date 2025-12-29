import React from "react";
import { motion } from "framer-motion"; // ✅ ADDED

const Forecast = ({ forecast }) => {
  return (
    <div className="mt-4">
      <h4>5-Day Forecast</h4>

      <motion.div
        className="d-flex flex-wrap justify-content-center"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.15 // ✅ stagger effect
            }
          }
        }}
      >
        {forecast.list
          .filter((_, index) => index % 8 === 0)
          .map((item, index) => (
            <motion.div
              key={index}
              className="card p-2 m-2"
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 }
              }}
            >
              <p>{new Date(item.dt_txt).toDateString()}</p>
              <p>{item.main.temp}°C</p>
              <p>{item.weather[0].main}</p>
            </motion.div>
          ))}
      </motion.div>
    </div>
  );
};

export default Forecast;