import React, { useState, useEffect } from "react";
import * as images from "../assets/images/index";
import axios from "axios";

function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [query, setQuery] = useState("Gorakhpur");
  const [error, setError] = useState(null);

  const currentLocationWeather = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const { latitude, longitude } = position.coords;
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${
          import.meta.env.VITE_API_KEY
        }`
      );
      setWeatherData(response.data);
      setQuery(response.data.name);
    } catch (error) {
      console.error("Error", error);
      setError("Location not found. Please try again.");
      setWeatherData(null);
    }
  };

  useEffect(() => {
    currentLocationWeather();
  }, []);

  const fetchWeather = async (query) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${
          import.meta.env.VITE_API_KEY
        }`
      );
      setWeatherData(response.data);
      localStorage.setItem("weatherData", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error", error);
      setError("Location not found. Please try again.");
      setWeatherData(null);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("weatherData")) {
      const data = JSON.parse(localStorage.getItem("weatherData"));
      if (data.name == query) setWeatherData(data);
    } else fetchWeather(query);
  }, [query]);

  return (
    <div className="min-h-screen bg-sky-900 flex flex-col justify-center items-center">
      <h1 className="w-full text-4xl text-teal-600 text-center font-serif font-bold p-4 mb-2">
        Weather App
      </h1>
      <div
        className="min-h-80 h-[540px] w-[480px] flex flex-col justify-center items-center gap-4 rounded-xl py-8 mb-8"
        style={{ backgroundImage: "linear-gradient(45deg, #2f4680, #500ae4)" }}
      >
        <div className="flex justify-center items-center gap-4 mt-2 py-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter Location"
            className="border-2 text-lg rounded-2xl py-1 px-2"
          />
          <div className="w-10 h-10 flex justify-center items-center bg-white rounded-full cursor-pointer">
            <img
              src={images.search}
              onClick={() => fetchWeather(query)}
              alt="search"
              className="w-5 h-5 rounded-full"
            />
          </div>
          <div
            className="w-10 h-10 flex justify-center items-center bg-white rounded-full cursor-pointer"
            onClick={currentLocationWeather}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 0c4.419 0 8 3.582 8 8 0 4.419-3.582 8-8 8-4.419 0-8-3.582-8-8 0-4.419 3.582-8 8-8zm0 1.5a6.5 6.5 0 015.802 9.798l-5.802 7.301-5.802-7.301A6.5 6.5 0 0110 1.5zM10 5a3 3 0 100 6 3 3 0 000-6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        {error && (
          <div className="bg-red-600 text-white p-4 rounded-lg my-4">
            {error}
          </div>
        )}
        {weatherData && (
          <>
            <div>
              <img
                src={`http://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@2x.png`}
                alt={weatherData?.weather[0]?.description}
                className="h-40 w-40 bg-white rounded-full"
              />
              <p className="text-white text-3xl text-center font-bold">
                {Math.floor(weatherData?.main?.temp)}°c
              </p>
              <p className="text-white text-3xl text-center font-bold">
                {weatherData?.name}
              </p>
            </div>
            <div className="w-full sm:w-4/6 flex justify-between items-center gap-4">
              <div className="text-white flex flex-col items-start p-4">
                <img src={images.humidity} className="h-10 w-10 mb-3" />
                <p>{weatherData?.main?.humidity}%</p>
                <p>Humidity</p>
              </div>
              <div className="text-white flex flex-col items-end p-4">
                <img src={images.wind} className="h-10 w-10 mb-3" />
                <p>{weatherData?.wind?.speed}km/h</p>
                <p>Wind</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
