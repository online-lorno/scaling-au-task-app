"use client";

import { useEffect } from "react";

const WeatherStatus = () => {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        console.log({ latitude, longitude });
        // const response = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}`);
        // weatherData = await response.json();
      });
    }
  }, []);

  return <div>WeatherStatus</div>;
};

export default WeatherStatus;
