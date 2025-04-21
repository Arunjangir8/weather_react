import React, { useState, useEffect } from 'react';

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
    <div className="hidden lg:flex items-center space-x-2 bg-transparent px-4 py-2 ">
      <div className="text-xl font-mono font-semibold text-gray-800 dark:text-white">
        {hours}:{minutes}:{seconds}
        <span className="text-sm ml-1 text-gray-600 dark:text-gray-400">{ampm}</span>
      </div>
    </div>
  );
}

export default DigitalClock;
