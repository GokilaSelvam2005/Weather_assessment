import React, { useState } from "react";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    const apiKey = "bfa1b0ecc5e24a73ba055429262502";

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Delhi&aqi=no`
      );

      const data = await response.json();
      console.log(data);

      if (data.error) {
        setError(data.error.message);
        setWeather(null);
        return;
      }

      setWeather(data);
      setError("");

    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="app">
      <center>
      <h1>Delhi Weather Dashboard🌥️</h1>

      <button onClick={getWeather}>Get Weather</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div className="card">
          <p><strong>Temperature:</strong> {weather.current.temp_c} °C ❄️</p>
          <p><strong>Condition:</strong> {weather.current.condition.text}</p>
          <p><strong>Humidity:</strong> {weather.current.humidity} %</p>
          <p><strong>Pressure:</strong> {weather.current.pressure_mb} mb</p>
        </div>
      )}
      </center>
    </div>
  );  
}

export default App;