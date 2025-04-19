import { useState, useEffect } from 'react';

export default function Loader() {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(progress < 80 ? progress + Math.floor(Math.random() * (25 - 10 + 1)) + 10 : 100);
    }, 300);
    return () => clearTimeout(timer);
  }, [progress]);
  
  return (
    <div className="fixed inset-0 bg-white bg-opacity-95 flex flex-col items-center justify-center z-50">

      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" 
             style={{ animationDelay: '0ms' }}></div>
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" 
             style={{ animationDelay: '150ms' }}></div>
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" 
             style={{ animationDelay: '300ms' }}></div>
        
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" 
             style={{ animationDelay: '450ms' }}></div>
      </div>
    
      <div className="w-64 h-2 bg-gray-200 rounded-full mt-8 overflow-hidden">
        <div 
          className="h-full bg-blue-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <p className="mt-4 text-gray-700 font-medium">
        Loading... {progress}%
      </p>
    </div>
  );
}