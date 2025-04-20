import React, { useEffect, useState } from 'react';
import Loader from './Loader';

const WeatherNow = ({ city, setcity, API_KEY }) => {
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);

  function gettingLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setcity(`${latitude},${longitude}`);
      },
      (error) => {
        console.log({
          "Geolocation error": error,
          "New Location": "New Delhi"
        });
        setcity("New Delhi")
        setLoading(false);
      }
    );
    return weatherData
  }

  const fetchWeather = (query) => {
    setLoading(true);
    fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${query}`)
      .then((res) => {
        if (!res.ok) {
          alert("City Not Found")
          return gettingLocation()
        } else {
          return res.json()
        }
      })
      .then((data) => {
        // console.log(data)
        setWeatherData(data);
        setLoading(false);
      })
  };

  useEffect(() => {
    if (city && city.trim() !== 'new delhi') {
      fetchWeather(city);
    } else {
      gettingLocation()
    }
  }, [city]);

  const { location, current } = weatherData;

  if (loading || !location || !current) {
    return <Loader />;
  }

  return (
    <>
          <div className="max-w-[950px] mx-6 bg-white dark:bg-gray-900 shadow-xl dark:shadow-[0_0_20px_rgba(255,255,255,0.15)] rounded-2xl p-6 space-y-6 mb-12 transition duration-300">

            <h1 className="text-3xl font-bold text-center text-indigo-600 dark:text-blue-400">
              Weather in {location.name}, {location.region}
            </h1>
            <p className="text-center text-gray-600 dark:text-gray-300">{location.country}</p>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">Local Time: {location.localtime}</p>

            <div className="flex items-center justify-center space-x-4">
              <img src={current.condition.icon} alt="condition" />
              <div>
                <p className="text-4xl font-bold">{current.temp_c}°C</p>
                <p className="text-lg">{current.condition.text}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-indigo-100 dark:bg-blue-400 p-3 rounded-lg ">
                <p className="font-semibold">Feels Like</p>
                <p>{current.feelslike_c}°C</p>
              </div>
              <div className="bg-indigo-100 dark:bg-blue-400 p-3 rounded-lg">
                <p className="font-semibold">Humidity</p>
                <p>{current.humidity}%</p>
              </div>
              <div className="bg-indigo-100 dark:bg-blue-400 p-3 rounded-lg">
                <p className="font-semibold">Wind</p>
                <p>{current.wind_kph} kph</p>
              </div>
              <div className="bg-indigo-100 dark:bg-blue-400 p-3 rounded-lg">
                <p className="font-semibold">Pressure</p>
                <p>{current.pressure_mb} mb</p>
              </div>
              <div className="bg-indigo-100 dark:bg-blue-400 p-3 rounded-lg col-span-2 text-center">
                <p className="font-semibold">UV Index</p>
                <p>{current.uv}</p>
              </div>
              <div className="bg-indigo-100 dark:bg-blue-400 p-3 rounded-lg col-span-2 text-center">
                <p className="font-semibold">Precipitation</p>
                <p>{current.precip_mm} mm</p>
              </div>
            </div>
          </div>
    </>
  );
};

export default WeatherNow;