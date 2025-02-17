import { WeatherUI } from './components/WeatherUI.js';
import { LocationSearch } from './components/LocationSearch.js';
import { WeatherForecast } from './components/WeatherForecast.js';
import { WeatherService } from './services/weatherService.js';
import { WeatherCharts } from './utils/charts.js';
import { notificationManager } from './utils/notifications.js';
import { geolocationService } from './utils/geolocation.js';
import { initializeTheme } from './utils/theme.js';

class WeatherApp {
    constructor() {
        this.ui = new WeatherUI();
        this.locationSearch = new LocationSearch();
        this.forecast = new WeatherForecast();
        this.charts = new WeatherCharts();
        this.weatherService = new WeatherService();
        
        this.initialize();
    }

    async initialize() {
        try {
            // Initialize theme
            initializeTheme();

            // Initialize notifications
            await notificationManager.initialize();

            // Setup event listeners
            this.setupEventListeners();

            // Try to load last location or get current location
            await this.loadInitialLocation();
        } catch (error) {
            console.error('Initialization error:', error);
            this.ui.showError('Failed to initialize the application');
        }
    }

    setupEventListeners() {
        // Setup location search
        this.locationSearch.onSearch(async (query) => {
            if (typeof query === 'string') {
                return await this.weatherService.searchLocation(query);
            } else {
                await this.updateWeather(query);
            }
        });

        // Setup geolocation button
        const geoButton = document.getElementById('geolocation-btn');
        if (geoButton) {
            geoButton.addEventListener('click', () => this.getCurrentLocation());
        }

        // Setup favorites
        const favoritesContainer = document.getElementById('favorites-list');
        if (favoritesContainer) {
            favoritesContainer.addEventListener('click', (e) => {
                const favoriteItem = e.target.closest('.favorite-location');
                if (favoriteItem) {
                    const location = {
                        name: favoriteItem.dataset.name,
                        lat: parseFloat(favoriteItem.dataset.lat),
                        lon: parseFloat(favoriteItem.dataset.lon)
                    };
                    this.updateWeather(location);
                }
            });
        }

        // Listen for unit changes
        document.addEventListener('unit-changed', async () => {
            const currentLocation = this.weatherService.getCurrentLocation();
            if (currentLocation) {
                await this.updateWeather(currentLocation);
            }
        });
    }

    async loadInitialLocation() {
        const savedLocation = localStorage.getItem('lastLocation');
        if (savedLocation) {
            try {
                const location = JSON.parse(savedLocation);
                await this.updateWeather(location);
                return;
            } catch (error) {
                console.error('Error loading saved location:', error);
            }
        }
        
        await this.getCurrentLocation();
    }

    async getCurrentLocation() {
        try {
            this.ui.showLoading();
            const position = await geolocationService.getCurrentPosition();
            const location = {
                name: 'Current Location',
                lat: position.coords.latitude,
                lon: position.coords.longitude
            };
            await this.updateWeather(location);
        } catch (error) {
            console.error('Geolocation error:', error);
            this.ui.showError('Failed to get current location. Please search for a location manually.');
        } finally {
            this.ui.hideLoading();
        }
    }

    async updateWeather(location) {
        try {
            this.ui.showLoading();

            // Save location
            localStorage.setItem('lastLocation', JSON.stringify(location));

            // Fetch weather data
            const [currentWeather, forecast] = await Promise.all([
                this.weatherService.getCurrentWeather(location),
                this.weatherService.getForecast(location)
            ]);

            // Update UI components
            this.ui.updateCurrentWeather(currentWeather);
            this.forecast.updateForecast(forecast);

            // Update charts
            this.updateCharts(forecast);

            // Check for weather alerts
            if (currentWeather.alerts && currentWeather.alerts.length > 0) {
                notificationManager.showWeatherAlert(currentWeather.alerts[0]);
            }

        } catch (error) {
            console.error('Error updating weather:', error);
            this.ui.showError('Failed to update weather information');
        } finally {
            this.ui.hideLoading();
        }
    }

    updateCharts(forecast) {
        const temperatureData = {
            labels: forecast.list.map(item => new Date(item.dt * 1000).toLocaleTimeString()),
            datasets: [{
                label: 'Temperature',
                data: forecast.list.map(item => item.temp)
            }]
        };

        const humidityData = {
            labels: forecast.list.map(item => new Date(item.dt * 1000).toLocaleTimeString()),
            datasets: [{
                label: 'Humidity',
                data: forecast.list.map(item => item.humidity)
            }]
        };

        const windData = {
            labels: forecast.list.map(item => new Date(item.dt * 1000).toLocaleTimeString()),
            datasets: [{
                label: 'Wind Speed',
                data: forecast.list.map(item => item.windSpeed)
            }]
        };

        this.charts.createTemperatureChart('temperature-chart', temperatureData);
        this.charts.createHumidityChart('humidity-chart', humidityData);
        this.charts.createWindChart('wind-chart', windData);
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WeatherApp();
}); 