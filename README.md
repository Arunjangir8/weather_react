# Weather App

## Overview
A modern weather application that provides real-time weather data and forecasts. Built with clean architecture and intuitive design to deliver accurate weather information in a user-friendly format.

## Features
* Current weather conditions display
* Multi-day weather forecasts
* Location-based weather detection
* Search functionality for global weather data
* Responsive design for all devices
* Detailed weather metrics (temperature, humidity, wind, etc.)
* Dark Mode

## Technology Stack
* React.js for frontend development
* Tailwind for styling
* Weather API integration
* Local storage for saving user preferences

## Installation

```bash
# Clone the repository
git clone https://github.com/Arunjangir8/weather_react.git

# Navigate to project directory
cd weather_react

# Install dependencies
npm install

# Create environment variables
# Create a .env file in the root directory with your API key:
# REACT_APP_WEATHER_API_KEY=your_api_key_here

# Start the development server
npm run dev
```

## Usage
1. Allow location access or search for a city
2. View current weather conditions
3. Check the forecast for upcoming days
4. Access detailed weather information by clicking on specific days

## Project Structure

```
weather-app/
├── public/
├── src/
│   ├── Pages/components/
│   │   │    ├── DigitalClock/
│   │   │    ├── Loader/
│   │   │    ├── WeatherHistory/
│   │   │    └── WeatherNowI/
│   │   ├── Contact/
│   │   ├── footer/
│   │   ├── Home/
│   │   ├── Navbar/
│   │   └── About/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .env
└── package.json
```

## Images

![alt text](./ReadmeSS/Screenshot%202025-04-21%20at%2011.41.37 PM.png)


![alt text](./ReadmeSS/Screenshot%202025-04-21%20at%2011.41.44 PM.png)


![alt text](./ReadmeSS/Screenshot%202025-04-21%20at%2011.42.01 PM.png)


![alt text](./ReadmeSS/Screenshot%202025-04-21%20at%2011.42.10 PM.png)


## API Reference
This application uses Weather API for fetching weather data.

## Contributing
1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License
Distributed under the MIT License. See `LICENSE` for more information.

## Contact
Your Name - Arun

Project Link: https://github.com/Arunjangir8/weather_react

## Acknowledgements
* Weather API
* React Documentation
* Font Awesome for weather icons