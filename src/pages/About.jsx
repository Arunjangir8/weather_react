import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-white dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white py-14 px-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 space-y-6 transition duration-300">

        <h1 className="text-4xl font-bold text-center text-indigo-600 dark:text-blue-400">
          About WeatherWise
        </h1>

        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          Welcome to <span className="font-semibold text-indigo-600 dark:text-blue-300">WeatherWise</span> – your go-to weather forecasting application designed with simplicity, accuracy, and performance in mind. Whether you're planning a trip or just deciding what to wear today, we've got you covered!
        </p>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-indigo-600 dark:text-blue-300">🌤 Features</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
            <li>Get real-time weather updates based on your location or any city worldwide.</li>
            <li>Explore weather history of the past 10 days with detailed statistics.</li>
            <li>Responsive and modern design with dark mode support.</li>
            <li>Built using React, Tailwind CSS, and WeatherAPI.</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-indigo-600 dark:text-blue-300">👨‍💻 Technologies Used</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
            <li>React.js for building dynamic components</li>
            <li>Tailwind CSS for utility-first styling</li>
            <li>WeatherAPI for reliable weather data</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-indigo-600 dark:text-blue-300">📬 Contact</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Have feedback or suggestions? Feel free to reach out at:
            <br />
            <a href="mailto:your.email@example.com" className="text-indigo-600 dark:text-blue-300 underline">arunjangir9987@example.com</a>
          </p>
        </div>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-10">
          &copy; {new Date().getFullYear()} WeatherWise. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default About;
