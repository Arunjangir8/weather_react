
import WeatherHistory from './components/WeatherHistory';
import WeatherNow from './components/WeatherNow';

const Home = ({ city, setcity, API_KEY }) => {
  return (
    <>
      <div className="min-h-[0%] bg-gradient-to-b from-indigo-100 to-white dark:from-gray-900 dark:to-gray-700 text-gray-800 dark:text-white py-14 lg:grid lg:grid-cols-[2fr_1fr] lg:gap-4 flex-col transition duration-300">
      
        <WeatherNow city={city} setcity={setcity} API_KEY={API_KEY}/>
    
        <WeatherHistory city={city} apiKey={API_KEY} setCity={setcity} />
      
      </div>
    </>
  );
};

export default Home;