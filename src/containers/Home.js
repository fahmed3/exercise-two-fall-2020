import React from "react";

import Header from "../components/Header";

const weatherKey = `67498b5b8ab3f81914de08af4d299a7a`;

function Home() {
  /* Display
    Weather Type (ex. Cloudy)
    Current Temperature
    High Temperature
    Low Temperature
    Cloudiness
    Humidity
    Wind Speed
    */
  return (
    <>
      <Header />
      <main className="Home">
        <h2>Weather in Seoul</h2>
        <div className="WeatherInfo">
          <p>Weather Type: Cloudy</p>
          <p>Current Temperature: 100 degrees</p>
          <p>High Temperature: 100 degrees</p>
          <p>Low Temperature: 80 degrees</p>
          <p>Cloudiness: 100</p>
          <p>Humidity: 35%</p>
          <p>Wind Speed: 3km/h</p>
        </div>
      </main>
    </>
  );
}

export default Home;
