# Weather App

![Weather App Demo](demo.gif)

A simple weather application built with React and Vite, utilizing the OpenWeatherMap API to fetch current weather data based on user input or geolocation.

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [License](#license)

## Project Overview

The Weather App allows users to fetch and display current weather conditions for a specific location. Users can either enter a city name to retrieve weather data or use their device's geolocation for automatic retrieval of weather information.

## Technologies Used

- React
- Vite
- Axios
- Tailwind CSS (for styling)

## Setup and Installation

### Prerequisites

- Node.js (version 12 or above)
- npm (or yarn)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/itsShivam2/weather-app.git
   cd weather-app
   ```

2. install dependencies:

   npm install

3. Environment Variables
   Create a `.env` file in the root directory with the following environment variable:

   VITE_API_KEY=your_openweathermap_api_key

   Replace your_openweathermap_api_key with your actual OpenWeatherMap API key. You can obtain an API key from OpenWeatherMap.

## Usage

1.  Start the development server:

    npm run dev

2.  Open your web browser and navigate to `http://localhost:3000` to view the Weather App.

## API Reference

The Weather App utilizes the OpenWeatherMap API to fetch weather data. Make sure to obtain an API key and configure it in your .env file as described above.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
