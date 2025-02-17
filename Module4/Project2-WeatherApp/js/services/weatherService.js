import { API_BASE_URL, GEOCODING_BASE_URL, API_SETTINGS, WEATHER_API_KEY } from '../config.js';
import { weatherCache } from '../utils/cache.js';
import { rateLimiter } from '../utils/rateLimiter.js';

class WeatherService {
    constructor() {
        this.currentLocation = null;
    }

    async searchLocation(query) {
        const url = `${GEOCODING_BASE_URL}/direct?q=${encodeURIComponent(query)}&limit=5&appid=${WEATHER_API_KEY}`;
        
        try {
            const response = await rateLimiter.enqueue(() => fetch(url));
            if (!response.ok) throw new Error('Location search failed');
            
            const data = await response.json();
            return data.map(location => ({
                name: location.name,
                state: location.state,
                country: location.country,
                lat: location.lat,
                lon: location.lon
            }));
        } catch (error) {
            console.error('Location search error:', error);
            throw new Error('Failed to search for location');
        }
    }

    async getCurrentWeather(location) {
        const cacheKey = `weather-${location.lat}-${location.lon}`;
        const cachedData = weatherCache.get(cacheKey);
        if (cachedData) return cachedData;

        const url = `${API_BASE_URL}/weather?lat=${location.lat}&lon=${location.lon}&units=${API_SETTINGS.units}&appid=${WEATHER_API_KEY}`;
        
        try {
            const response = await rateLimiter.enqueue(() => fetch(url));
            if (!response.ok) throw new Error('Weather data fetch failed');
            
            const data = await response.json();
            const processedData = this.processWeatherData(data);
            
            weatherCache.set(cacheKey, processedData);
            this.currentLocation = location;
            
            return processedData;
        } catch (error) {
            console.error('Weather fetch error:', error);
            throw new Error('Failed to fetch weather data');
        }
    }

    async getForecast(location) {
        const cacheKey = `forecast-${location.lat}-${location.lon}`;
        const cachedData = weatherCache.get(cacheKey);
        if (cachedData) return cachedData;

        const url = `${API_BASE_URL}/forecast?lat=${location.lat}&lon=${location.lon}&units=${API_SETTINGS.units}&appid=${WEATHER_API_KEY}`;
        
        try {
            const response = await rateLimiter.enqueue(() => fetch(url));
            if (!response.ok) throw new Error('Forecast data fetch failed');
            
            const data = await response.json();
            const processedData = this.processForecastData(data);
            
            weatherCache.set(cacheKey, processedData);
            return processedData;
        } catch (error) {
            console.error('Forecast fetch error:', error);
            throw new Error('Failed to fetch forecast data');
        }
    }

    processWeatherData(data) {
        return {
            temp: data.main.temp,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            windSpeed: data.wind.speed,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            alerts: data.alerts || [],
            timestamp: Date.now()
        };
    }

    processForecastData(data) {
        return {
            list: data.list.map(item => ({
                dt: item.dt,
                temp: item.main.temp,
                humidity: item.main.humidity,
                windSpeed: item.wind.speed,
                description: item.weather[0].description,
                icon: item.weather[0].icon
            }))
        };
    }

    getCurrentLocation() {
        return this.currentLocation;
    }
}

export const weatherService = new WeatherService(); 