import React, { useEffect, useState } from 'react';
import Loader from './components/Loader';

const Home = ({ city, API_KEY }) => {
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);

  function gettingLocation(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(`${latitude},${longitude}`);
      },
      (error) => {
        console.log("Geolocation error:", error);
        setLoading(false);
      }
    );
    return weatherData
  }

  const fetchWeather = (query) => {
    setLoading(true);
    fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${query}`)
      .then((res) => {
        if (!res.ok){
          alert("City Not Found")
          return gettingLocation()
        }else{
          return res.json()
        }
      })
      .then((data) => {
        setWeatherData(data);
        setLoading(false);
      })
  };

  useEffect(() => {
    if (city && city.trim() !== '') {
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
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-white dark:from-gray-900 dark:to-gray-700 text-gray-800 dark:text-white py-14 lg:grid lg:grid-cols-[2fr_1fr] lg:gap-4 flex-col ">
      <div>
        <div className="max-w-[950px] mx-auto bg-white dark:bg-gray-900 shadow-xl dark:shadow-[0_0_20px_rgba(255,255,255,0.15)] rounded-2xl p-6 space-y-6 ">

          <h1 className="text-3xl font-bold text-center text-indigo-600 dark:text-indigo-400">
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
            <div className="bg-indigo-100 dark:bg-indigo-800 p-3 rounded-lg">
              <p className="font-semibold">Feels Like</p>
              <p>{current.feelslike_c}°C</p>
            </div>
            <div className="bg-indigo-100 dark:bg-indigo-800 p-3 rounded-lg">
              <p className="font-semibold">Humidity</p>
              <p>{current.humidity}%</p>
            </div>
            <div className="bg-indigo-100 dark:bg-indigo-800 p-3 rounded-lg">
              <p className="font-semibold">Wind</p>
              <p>{current.wind_kph} kph</p>
            </div>
            <div className="bg-indigo-100 dark:bg-indigo-800 p-3 rounded-lg">
              <p className="font-semibold">Pressure</p>
              <p>{current.pressure_mb} mb</p>
            </div>
            <div className="bg-indigo-100 dark:bg-indigo-800 p-3 rounded-lg col-span-2 text-center">
              <p className="font-semibold">UV Index</p>
              <p>{current.uv}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <DigitalClock />
      </div>
    </div>
  );
};

export default Home;










function DigitalClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours() % 12 || 12;
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  const ampm = time.getHours() >= 12 ? 'PM' : 'AM';

  return (

    <div className="m-10 lg:m-0 max-w-md mx-auto bg-white dark:bg-gray-900 shadow-xl dark:shadow-[0_0_20px_rgba(255,255,255,0.15)] rounded-2xl p-6 space-y-6 text-center">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-4">Digital Clock</h2>

      <div className="text-4xl sm:text-5xl font-mono font-bold text-gray-900 dark:text-white">
        {hours}:{minutes}:{seconds}
        <span className="text-lg sm:text-2xl ml-2 text-gray-600 dark:text-gray-300">{ampm}</span>
      </div>

      <div className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400">
        {time.toLocaleDateString(undefined, {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        })}
      </div>
    </div>

  );
}