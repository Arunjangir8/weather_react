import React, { useState } from 'react';

const SideBar = () => {
  const initialCities = [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad",
    "Chennai", "Kolkata", "Pune", "Jaipur", "Surat"
  ];

  const [selectedCity, setSelectedCity] = useState(initialCities[0]);

  const getDropdownList = () => {
    return [selectedCity, ...initialCities.filter(city => city !== selectedCity)];
  };

  const handleChange = (e) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded shadow-md">
      <label htmlFor="city" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
        Select a City:
      </label>
      <select
        id="city"
        value={selectedCity}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      >
        {getDropdownList().map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SideBar;
