import { useEffect, useState } from "react";
import { Sun, CloudSun, Cloud, CloudRain, CloudSnow } from "lucide-react";

const WEATHER_ICONS = [
  { icon: Sun, label: "Sunny" },
  { icon: CloudSun, label: "Partly Cloudy" },
  { icon: Cloud, label: "Cloudy" },
  { icon: CloudRain, label: "Rainy" },
  { icon: CloudSnow, label: "Snowy" },
];

export default function Loader({ text = "Loading Weather..." }) {
  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);  

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);  
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % WEATHER_ICONS.length);
    }, 300);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  if (!isLoading) return null;  

  const { icon: Icon, label } = WEATHER_ICONS[current];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900 z-50">
      <div className="flex flex-col items-center justify-center gap-4">
        <Icon size={64} className="text-indigo-500 dark:text-indigo-300 animate-pulse" />
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{label}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">{text}</p>
      </div>
    </div>
  );
}
