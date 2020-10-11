import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

import Header from "../components/Header";

const weatherKey = `67498b5b8ab3f81914de08af4d299a7a`;

function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Tokyo");

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${weatherKey}`
      )
      .then(function (response) {
        setWeatherData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [city]); //[] for when to call function, only runs once if empty
  //ex: [weatherData] would call everytime weatherData changes

  const {
    cloudiness,
    currentTemp,
    highTemp,
    humidity,
    lowTemp,
    weatherType,
    windSpeed,
  } = useMemo(() => {
    let cloudiness = "";
    let currentTemp = "";
    let highTemp = "";
    let humidity = "";
    let lowTemp = "";
    let weatherType = "";
    let windSpeed = ""; // weatherData ? weatherData.wind.speed : '';

    if (weatherData) {
      cloudiness = `${weatherData.clouds.all}%`;
      currentTemp = `${weatherData.main.temp} degrees`;
      highTemp = `${weatherData.main.temp_max} degrees`;
      lowTemp = `${weatherData.main.temp_min} degrees`;
      weatherType = `${weatherData.weather[0].description}`;
      windSpeed = `${weatherData.wind.speed} km/h`;
      humidity = `${weatherData.main.humidity}%`;
    }

    return {
      cloudiness,
      currentTemp,
      highTemp,
      humidity,
      lowTemp,
      weatherType,
      windSpeed,
    };
  }, [weatherData]);

  return (
    <>
      <Header />
      <main className="Home">
        <h2>Weather in {city} </h2>
        <div className="WeatherInfo">
          <p>Weather Type: {weatherType} </p>
          <p>Current Temperature: {currentTemp} </p>
          <p>High Temperature: {highTemp} </p>
          <p>Low Temperature: {lowTemp} </p>
          <p>Cloudiness: {cloudiness}</p>
          <p>Humidity: {humidity}</p>
          <p>Wind Speed: {windSpeed}</p>
        </div>
      </main>
    </>
  );
}

export default Home;

//HTTP request directly in browser
/*
<script>
  document.addEventListener("DOMContenLoaded", function() {
    axios.get('/')then().catch();
  })
</script>
*/
