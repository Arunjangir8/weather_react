import React from 'react'
import { useState, useEffect } from 'react';
import Loader from './Loader';

function WeatherHistory({ city, apiKey }) {
    const [weather, setWeather] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const last10Days = Array.from({ length: 10 }, (k, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (i + 1));
      return date.toISOString().split('T')[0];
    });
  
    useEffect(() => {
      setSelectedDate(last10Days[0]);
    }, []);
  
    useEffect(() => {
      if (!selectedDate) return;
  
      const fetchWeather = async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch(
            `https://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${city}&dt=${selectedDate}`
          );
          if (!res.ok) throw new Error('Failed to fetch weather');
          const data = await res.json();
          // console.log(data)
          setWeather(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
      fetchWeather();
    }, [selectedDate, city]);
  
    const handleDateChange = (e) => {
      setSelectedDate(e.target.value);
    };
  
    if (loading) return <Loader />
    if (error) return <p className="text-red-500">Error: {error}</p>;
  
    const forecast = weather.forecast.forecastday[0].day;
  
    return (
        <div className="max-w-[950px] mx-6 bg-white dark:bg-gray-900 shadow-xl dark:shadow-[0_0_20px_rgba(255,255,255,0.15)] rounded-2xl p-6 space-y-6 mb-12 transition duration-300">
  
          <h2 className="text-3xl font-bold text-center text-indigo-600 dark:text-blue-400">
            Past Weather in {weather.location.name}
          </h2>
  
          <p className="text-center text-gray-600 dark:text-gray-300">{weather.location.country}</p>
  
          <div className="flex justify-center items-center mb-6">
            <div className="flex items-center justify-around gap-2">
              <img src={forecast.condition.icon} alt={forecast.condition.text} className="w-20 h-20 mb-9" />
            </div>
            <select
              className="p-2 border h-12 border-grey-100 dark:border-none rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 lg:w-[40%] text-center font-bold text-lg mb-9"
              value={selectedDate}
              onChange={handleDateChange}
            >
              {last10Days.map((date) => (
                <option key={date} value={date}>
                  {new Date(date).toLocaleDateString()}
                </option>
              ))}
            </select>
          </div>
  
          {/* <div className="text-center text-gray-700 dark:text-gray-300 mb-4">
      <p><span className="font-semibold">Date:</span> {forecast.date}</p>
    </div> */}
  
          <div className="grid grid-cols-2 gap-4 text-sm dark:text-black dark:font-bold">
            <div className="bg-indigo-100 dark:bg-blue-400 p-3 rounded-lg">
              <p className="font-semibold">Max Temp</p>
              <p>{forecast.maxtemp_c}°C</p>
            </div>
            <div className="bg-indigo-100 dark:bg-blue-400 p-3 rounded-lg">
              <p className="font-semibold">Min Temp</p>
              <p>{forecast.mintemp_c}°C</p>
            </div>
            <div className="bg-indigo-100 dark:bg-blue-400 p-3 rounded-lg">
              <p className="font-semibold">Max Wind</p>
              <p>{forecast.maxwind_kph} kph</p>
            </div>
            <div className="bg-indigo-100 dark:bg-blue-400 p-3 rounded-lg">
              <p className="font-semibold">Condition</p>
              <p>{forecast.condition.text}</p>
            </div>
            <div className="bg-indigo-100 dark:bg-blue-400 p-3 rounded-lg col-span-2 text-center">
              <p className="font-semibold">UV Index</p>
              <p>{forecast.uv}</p>
            </div>
            <div className="bg-indigo-100 dark:bg-blue-400 p-3 rounded-lg col-span-2 text-center">
              <p className="font-semibold">Precipitation</p>
              <p>{forecast.totalprecip_mm} mm</p>
            </div>
          </div>
        </div>
  
  
    );
}

export default WeatherHistory
