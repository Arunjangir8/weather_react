import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Menu, X, Sun, Moon } from 'lucide-react';

const Navbar = ({ setCity, API_KEY }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestionsRef = useRef(null);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

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
    setSearchQuery("")
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-indigo-600 dark:text-blue-400">WeatherNow</h1>

        
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button key={link.name} onClick={() => navigate(link.path)} className="text-gray-700 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition">
              {link.name}
            </button>
          ))}

          <form onSubmit={handleSearch} className="relative w-[450px]" ref={suggestionsRef}>
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
            <button type="submit" className="absolute right-2 top-2 text-gray-400 dark:text-white">{isLoading ? '...' : <Search size={18} />}</button>

          
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

          <button onClick={() => setIsDarkMode(!isDarkMode)} className="ml-2 text-gray-600 dark:text-gray-300">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>


        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {navLinks.map((link) => (
            <button key={link.name} onClick={() => navigate(link.path)} className="block w-full text-left text-gray-700 dark:text-gray-300">
              {link.name}
            </button>
          ))}
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