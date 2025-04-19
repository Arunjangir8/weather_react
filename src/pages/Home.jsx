import React, { useEffect, useState } from 'react';
import Loader from './components/Loader';

const Home = ({ city, setcity, API_KEY }) => {
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);

  function gettingLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(`${latitude},${longitude}`);
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
    <>
      <div className="min-h-[0%] bg-gradient-to-b from-indigo-100 to-white dark:from-gray-900 dark:to-gray-700 text-gray-800 dark:text-white py-14 lg:grid lg:grid-cols-[1fr_1fr] lg:gap-4 flex-col">
      
          <div className="max-w-[950px] mx-6 bg-white dark:bg-gray-900 shadow-xl dark:shadow-[0_0_20px_rgba(255,255,255,0.15)] rounded-2xl p-6 space-y-6 mb-12">

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
              <div className="bg-indigo-100 dark:bg-blue-400 p-3 rounded-lg">
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
        
    
        <WeatherHistory city={city} apiKey={API_KEY} />
      
      </div>
    </>
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




const WeatherHistory = ({ city, apiKey }) => {
  const [weather, setWeather] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const last10Days = Array.from({ length: 10 }, (_, i) => {
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
          `http://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${city}&dt=${selectedDate}`
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
  // const date = weather.forecast.forecastday[0].date;

  return (
      <div className="max-w-[950px] mx-6 bg-white dark:bg-gray-900 shadow-xl dark:shadow-[0_0_20px_rgba(255,255,255,0.15)] rounded-2xl p-6 space-y-6 mb-12">

        <h2 className="text-3xl font-bold text-center text-indigo-600 dark:text-blue-400">
          Past Weather in {weather.location.name}
        </h2>

        <p className="text-center text-gray-600 dark:text-gray-300">{weather.location.country}</p>

        <div className="flex justify-center mb-6">
          <div className="flex items-center justify-around gap-2">
            <img src={forecast.condition.icon} alt={forecast.condition.text} className="w-20 h-20" />
          </div>
          <select
            className="p-2 border h-12 border-grey-100 dark:border-none rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 lg:w-[30%] text-center font-bold text-lg mb-16"
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

        <div className="grid grid-cols-2 gap-4 text-sm">
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
};