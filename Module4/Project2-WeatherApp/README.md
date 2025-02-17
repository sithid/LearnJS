# Project 2: Weather App

## Project Overview
Build a weather application that fetches and displays weather data from a weather API. The app will show current weather conditions, forecasts, and allow users to search for different locations. It will demonstrate working with APIs, async/await, and dynamic UI updates.

## API Setup
### Getting an API Key
1. Sign up for a free account at [OpenWeatherMap](https://openweathermap.org/api)
2. Go to your account's "API Keys" section
3. Generate a new API key (it may take a few hours to activate)

### Configuring the API Key
1. Create a file `js/config.js` in your project:
   ```javascript
   export const WEATHER_API_KEY = 'your_api_key_here';
   ```
2. Add this file to your `.gitignore` to keep your API key private:
   ```
   # .gitignore
   js/config.js
   ```

### API Usage Guidelines
- Free tier limitations:
  - 60 calls/minute
  - Current weather and 5-day forecast data
  - Basic weather maps
- The app implements rate limiting to stay within these limits
- Consider implementing caching to reduce API calls

### Security Best Practices
- Never commit your API key to version control
- Don't expose the key in client-side code in production
- Consider using environment variables in production
- Use a backend proxy for production deployments

### Troubleshooting
Common issues and solutions:
1. "API key is invalid":
   - Verify the key is correctly copied
   - Wait a few hours after creating a new key
   - Check for any spaces or special characters

2. "Too many requests":
   - Implement proper rate limiting
   - Use caching for repeated requests
   - Check your API usage in the OpenWeatherMap dashboard

3. "Failed to fetch":
   - Verify your internet connection
   - Check if the API endpoint is correct
   - Ensure your API key has the correct permissions

## Requirements

### Core Features
1. Weather Data Display
   - Current temperature and conditions
   - High and low temperatures
   - Humidity and wind speed
   - Weather icon and description
   - 5-day forecast

2. Location Management
   - Search for locations by city name
   - Get user's current location using geolocation
   - Save favorite locations
   - Switch between saved locations

3. API Integration
   - Connect to a weather API (e.g., OpenWeatherMap)
   - Handle API responses and errors
   - Cache API responses
   - Rate limiting handling

### Additional Features
1. UI Enhancements
   - Animated weather icons
   - Temperature unit conversion (C°/F°)
   - Responsive design for all devices
   - Loading states and transitions

2. Data Visualization
   - Temperature graphs
   - Precipitation probability
   - Wind direction indicator
   - UV index display

3. Advanced Features
   - Weather alerts and notifications
   - Background changes based on weather/time
   - Offline support with cached data
   - Location autocomplete

## Project Structure
```
Project2-WeatherApp/
├── index.html
├── css/
│   ├── styles.css
│   └── weather-icons.css
├── js/
│   ├── app.js
│   ├── weather.js
│   ├── location.js
│   ├── ui.js
│   └── cache.js
├── assets/
│   └── icons/
└── README.md
```

## Implementation Steps

### Step 1: Setup
1. Create project structure
2. Set up HTML layout
3. Add basic CSS styling
4. Create JavaScript modules
5. Set up API key configuration

### Step 2: API Integration
1. Create weather service class
2. Implement API calls
3. Add error handling
4. Set up data caching
5. Implement rate limiting

### Step 3: Location Features
1. Add location search
2. Implement geolocation
3. Create location management
4. Add favorites functionality

### Step 4: Weather Display
1. Create current weather display
2. Add forecast display
3. Implement weather icons
4. Add temperature conversion
5. Create data visualizations

### Step 5: Advanced Features
1. Add offline support
2. Implement weather alerts
3. Add background effects
4. Create location autocomplete
5. Add final polish

## Testing Guidelines
1. Test API integration
2. Verify geolocation
3. Test offline functionality
4. Check error handling
5. Verify data accuracy
6. Test responsive design
7. Cross-browser testing

## Success Criteria
- All core features implemented
- Clean, responsive UI
- Efficient API usage
- Proper error handling
- Smooth user experience
- Offline functionality
- Cross-browser compatibility

## Resources
- [OpenWeatherMap API](https://openweathermap.org/api)
- [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
- [Weather Icons](https://erikflowers.github.io/weather-icons/)
- [Chart.js Documentation](https://www.chartjs.org/docs/latest/)

Ready to start building? Let's create the HTML structure! 🚀 