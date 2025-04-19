import React from 'react'
import { useState,useEffect } from 'react';

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

export default DigitalClock
