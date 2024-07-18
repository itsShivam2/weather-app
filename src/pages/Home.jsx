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
    <div
      className="min-h-screen bg-sky-900 flex flex-col justify-center items-center"
      style={{
        background: "#11567e",
        background: "-webkit-radial-gradient(circle, #11567e 0%, #2b32b2 100%)",
        background: "radial-gradient(circle, #11567e 0%, #2b32b2 100%)",
      }}
    >
      <h1 className="w-full text-4xl text-white text-center font-serif font-bold p-4 mb-2">
        Weather App
      </h1>
      <div
        className="min-h-80 sm:h-[500px] sm:w-[480px] flex flex-col justify-center items-center gap-4 rounded-xl px-4 py-8 mb-8"
        style={{
          background: "rgba(13,25,89,0.5)",
          background:
            "-webkit-linear-gradient(0deg, #2b2f77 0%, #141852 50%, #070b34 100%)",
          background:
            "linear-gradient(0deg, #2b2f77 0%, #141852 50%, #070b34 100%)",
        }}
      >
        <div className="flex justify-center items-center gap-4 mt-2 py-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter Location"
            className="border-2 text-sm sm:text-lg rounded-2xl py-1 px-2"
          />
          <div className="w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center bg-white rounded-full cursor-pointer">
            <img
              src={images.search}
              onClick={() => fetchWeather(query)}
              alt="search"
              className="w-4 h-4 sm:w-5 sm:h-5 rounded-full"
            />
          </div>
          <div
            className="w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center bg-white rounded-full cursor-pointer"
            onClick={currentLocationWeather}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 sm:w-5 sm:h-5"
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
            <div className="w-full flex flex-col justify-center items-center gap-1">
              <img
                src={`http://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@2x.png`}
                alt={weatherData?.weather[0]?.description}
                className="sm:h-32 sm:w-32 bg-white rounded-full"
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
                <img src={images.humidity} className="h-8 w-8 mb-3" />
                <p>{weatherData?.main?.humidity}%</p>
                <p>Humidity</p>
              </div>
              <div className="text-white flex flex-col items-end p-4">
                <img src={images.wind} className="h-8 w-8 mb-3" />
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
