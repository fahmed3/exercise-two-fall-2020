import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Header from "../components/Header";
import WeatherImage from "../components/WeatherImage";

const weatherKey = `67498b5b8ab3f81914de08af4d299a7a`;

function Home() {
  const history = useHistory();
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Chicago");

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${weatherKey}`
      )
      .then(function (response) {
        setWeatherData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [city]); //[] for when to call function, only runs once if empty
  //ex: [weatherData] would call everytime weatherData changes

  useEffect(() => {
    const searchParams = history.location.search;
    const urlParams = new URLSearchParams(searchParams);
    const city = urlParams.get("city");
    if (city) {
      setCity(city);
    }
  }, [history]);

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
      currentTemp = `${Math.round(weatherData.main.temp)}°`;
      highTemp = `${Math.round(weatherData.main.temp_max)}°`;
      lowTemp = `${Math.round(weatherData.main.temp_min)}°`;
      weatherType = `${weatherData.weather[0].description}`;
      windSpeed = `${weatherData.wind.speed} mph`;
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
        <h2>
          Weather in <span>{city}</span>{" "}
        </h2>
        <div className="WeatherInfo">
          <div
            className="WeatherInfo_Basic"
            style={{
              backgroundImage: `linear-gradient(to top, white, rgba(0,0,0,${cloudiness}) 98%)`,
            }}
          >
            <div className="WeatherInfo_Image">
              <WeatherImage weatherType={weatherType} />
            </div>
            <p className="WeatherInfo_Type"> {weatherType} </p>
            <h3 className="Label"> Current Temperature:</h3>
            <p className="WeatherInfo_Temp"> {currentTemp} </p>
          </div>
          <div className="WeatherInfo_Extra">
            <div className="WeatherInfo_Extra_Column">
              <h3 className="Label">High Temperature: </h3>
              <p className="WeatherInfo_Temp_Small"> {highTemp} </p>
              <h3 className="Label"> Low Temperature: </h3>
              <p className="WeatherInfo_Temp_Small"> {lowTemp} </p>
            </div>
            <div className="WeatherInfo_Extra_Column">
              <h3 className="Label"> Cloudiness: </h3>
              <p className="WeatherInfo_Temp_Small"> {cloudiness}</p>
              <h3 className="Label"> Humidity:</h3>
              <p className="WeatherInfo_Temp_Small">{humidity}</p>
              <h3 className="Label"> Wind Speed:</h3>
              <p className="WeatherInfo_Temp_Small"> {windSpeed}</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
