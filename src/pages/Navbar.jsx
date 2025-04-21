import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Menu, X, Sun, Moon } from 'lucide-react';
import DigitalClock from './components/DigitalClock';

const Navbar = ({ setCity, API_KEY }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestionsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const root = document.documentElement;
    isDarkMode ? root.classList.add('dark') : root.classList.remove('dark');
  }, [isDarkMode]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.length >= 2) fetchSuggestions(searchQuery);
    }, 200);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchSuggestions = async (query) => {
    setIsLoading(true);
    try {
      const res = await fetch(`https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${query}`);
      const data = await res.json();
      setSuggestions(data);
    } catch {
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCity(searchQuery);
    setSearchQuery('');
    setShowSuggestions(false);
    setIsMenuOpen(false);
  };

  const handleSuggestionClick = (suggestion) => {
    const city = suggestion.name;
    setSearchQuery(`${suggestion.name}, ${suggestion.country}`);
    setCity(city);
    setShowSuggestions(false);
    setSearchQuery('');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="w-full mx-auto px-10 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-indigo-600 dark:text-blue-400">WeatherNow</h1>

        <div className="hidden md:flex items-center gap-6 ml-4">
          <button onClick={() => navigate('/')} className="text-gray-700 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition">
            Home
          </button>
          <button onClick={() => navigate('/about')} className="text-gray-700 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition">
            About
          </button>
          <button onClick={() => navigate('/contact')} className="text-gray-700 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition">
            Contact
          </button>
          <form onSubmit={handleSearch} className="relative w-[450px]" ref={suggestionsRef}>
            <input
              type="text"
              placeholder="Search city..."
              value={searchQuery}
              onChange={(e) => {
                if (e.target.value.trim() !== ""){
                  setSearchQuery(e.target.value);
                setShowSuggestions(true);
                }
              }}
              className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <button type="submit" className="absolute right-2 top-2 text-gray-400 dark:text-white">
              {isLoading ? '...' : <Search size={20} />}
            </button>

            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-50 bg-white dark:bg-gray-800 w-full mt-1 rounded shadow max-h-60 overflow-auto">
                {suggestions.map((sug, i) => (
                  <div
                    key={i}
                    onClick={() => handleSuggestionClick(sug)}
                    className="px-3 py-2 cursor-pointer dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {sug.name}, {sug.country}
                  </div>
                ))}
              </div>
            )}
          </form>
          
          <div className='flex justify-between'>
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="ml-2 text-gray-600 dark:text-gray-300">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            
          </button>
          <DigitalClock/>
          </div>
        </div>

        <button className="md:hidden dark:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <button onClick={() => { navigate('/'); setIsMenuOpen(false); }} className="block w-full text-left text-gray-700 dark:text-gray-300">
            Home
          </button>
          <button onClick={() => { navigate('/about'); setIsMenuOpen(false); }} className="block w-full text-left text-gray-700 dark:text-gray-300">
            About
          </button>
          <button onClick={() => { navigate('/contact'); setIsMenuOpen(false); }} className="block w-full text-left text-gray-700 dark:text-gray-300">
            Contact
          </button>

          <form onSubmit={handleSearch} className="relative" ref={suggestionsRef}>
            <input
              type="text"
              placeholder="Search city..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-50 bg-white dark:bg-gray-800 w-full mt-1 rounded shadow max-h-60 overflow-auto">
                {suggestions.map((sug, i) => (
                  <div
                    key={i}
                    onClick={() => handleSuggestionClick(sug)}
                    className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {sug.name}, {sug.country}
                  </div>
                ))}
              </div>
            )}
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
