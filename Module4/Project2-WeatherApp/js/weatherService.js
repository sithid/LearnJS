import { Cache } from './cache.js';

export class WeatherService {
    constructor() {
        this.baseUrl = 'https://api.openweathermap.org/data/2.5';
        this.cache = new Cache();
        this.init();
    }

    async init() {
        await this.cache.init();
    }

    async getCurrentWeather(location) {
        try {
            // Check cache first
            const cachedData = await this.cache.getCachedWeatherData(location);
            if (cachedData && cachedData.currentWeather) {
                return cachedData.currentWeather;
            }

            const endpoint = `${this.baseUrl}/weather`;
            const params = {
                lat: location.lat,
                lon: location.lon,
                units: 'metric',
                appid: process.env.WEATHER_API_KEY
            };

            const data = await this.makeRequest(endpoint, params);
            const processedData = this.processWeatherData(data);

            // Cache the new data
            await this.cache.cacheWeatherData(location, processedData, null);

            return processedData;
        } catch (error) {
            console.error('Weather fetch error:', error);
            throw new Error('Failed to fetch weather data');
        }
    }

    async getForecast(location) {
        try {
            // Check cache first
            const cachedData = await this.cache.getCachedWeatherData(location);
            if (cachedData && cachedData.forecast) {
                return cachedData.forecast;
            }

            const endpoint = `${this.baseUrl}/forecast`;
            const params = {
                lat: location.lat,
                lon: location.lon,
                units: 'metric',
                appid: process.env.WEATHER_API_KEY
            };

            const data = await this.makeRequest(endpoint, params);
            const processedData = this.processForecastData(data);

            // Cache the new data
            await this.cache.cacheWeatherData(location, null, processedData);

            return processedData;
        } catch (error) {
            console.error('Forecast fetch error:', error);
            throw new Error('Failed to fetch forecast data');
        }
    }

    // ... existing code ...
} 