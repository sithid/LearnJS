import { WeatherService } from './weather.js';
import { LocationService } from './location.js';
import { UI } from './ui.js';
import { Cache } from './cache.js';

class App {
    constructor() {
        this.cache = new Cache();
        this.weatherService = new WeatherService(process.env.WEATHER_API_KEY);
        this.locationService = new LocationService();
        this.ui = new UI();
        
        this.currentUnit = 'celsius';
        this.currentLocation = null;
        
        this.init();
    }

    async init() {
        try {
            // Show loading state
            this.ui.showLoading();

            // Initialize services
            await this.initializeServices();

            // Set up event listeners
            this.setupEventListeners();

            // Try to get user's location
            await this.getUserLocation();

            // Hide loading state
            this.ui.hideLoading();
        } catch (error) {
            console.error('Failed to initialize app:', error);
            this.ui.showError('Failed to load weather data. Please try again.');
            this.ui.hideLoading();
        }
    }

    async initializeServices() {
        // Initialize cache
        await this.cache.init();

        // Load saved favorites
        const favorites = await this.cache.getFavorites();
        this.ui.renderFavorites(favorites);

        // Set saved temperature unit
        const savedUnit = localStorage.getItem('temperatureUnit');
        if (savedUnit) {
            this.currentUnit = savedUnit;
            this.ui.updateUnitDisplay(savedUnit);
        }
    }

    setupEventListeners() {
        // Search
        document.getElementById('location-search').addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        document.getElementById('search-btn').addEventListener('click', () => {
            const searchInput = document.getElementById('location-search');
            this.handleSearch(searchInput.value);
        });

        // Geolocation
        document.getElementById('geolocation-btn').addEventListener('click', () => {
            this.getUserLocation();
        });

        // Temperature unit toggle
        document.getElementById('unit-toggle').addEventListener('click', () => {
            this.toggleTemperatureUnit();
        });

        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.ui.toggleTheme();
        });

        // Favorites
        document.getElementById('add-favorite').addEventListener('click', () => {
            this.toggleFavorite();
        });

        // Search results
        document.getElementById('search-results').addEventListener('click', (e) => {
            if (e.target.classList.contains('search-result')) {
                this.handleLocationSelect(e.target.dataset.location);
            }
        });
    }

    async handleSearch(query) {
        if (query.length < 3) {
            this.ui.hideSearchResults();
            return;
        }

        try {
            const locations = await this.locationService.searchLocations(query);
            this.ui.showSearchResults(locations);
        } catch (error) {
            console.error('Search failed:', error);
            this.ui.showError('Location search failed. Please try again.');
        }
    }

    async handleLocationSelect(locationData) {
        try {
            this.ui.showLoading();
            this.ui.hideSearchResults();

            const location = JSON.parse(locationData);
            this.currentLocation = location;

            // Get weather data
            await this.updateWeatherData(location);

            // Clear search
            document.getElementById('location-search').value = '';
        } catch (error) {
            console.error('Failed to get weather data:', error);
            this.ui.showError('Failed to get weather data. Please try again.');
        } finally {
            this.ui.hideLoading();
        }
    }

    async getUserLocation() {
        try {
            this.ui.showLoading();
            const position = await this.locationService.getCurrentPosition();
            const location = await this.locationService.reverseGeocode(
                position.coords.latitude,
                position.coords.longitude
            );
            
            this.currentLocation = location;
            await this.updateWeatherData(location);
        } catch (error) {
            console.error('Failed to get user location:', error);
            this.ui.showError('Failed to get your location. Please search for a location instead.');
        } finally {
            this.ui.hideLoading();
        }
    }

    async updateWeatherData(location) {
        try {
            // Get current weather
            const weatherData = await this.weatherService.getCurrentWeather(
                location.lat,
                location.lon
            );

            // Get forecast
            const forecast = await this.weatherService.getForecast(
                location.lat,
                location.lon
            );

            // Update UI
            this.ui.updateWeatherDisplay(weatherData, this.currentUnit);
            this.ui.updateForecast(forecast, this.currentUnit);
            this.ui.updateCharts(forecast);
            this.ui.updateLocationName(location.name);

            // Cache the data
            await this.cache.cacheWeatherData(location, weatherData, forecast);
        } catch (error) {
            throw new Error('Failed to update weather data');
        }
    }

    async toggleFavorite() {
        if (!this.currentLocation) return;

        try {
            const favorites = await this.cache.getFavorites();
            const isFavorite = favorites.some(fav => 
                fav.lat === this.currentLocation.lat && 
                fav.lon === this.currentLocation.lon
            );

            if (isFavorite) {
                await this.cache.removeFavorite(this.currentLocation);
                this.ui.showSuccess('Location removed from favorites');
            } else {
                await this.cache.addFavorite(this.currentLocation);
                this.ui.showSuccess('Location added to favorites');
            }

            const updatedFavorites = await this.cache.getFavorites();
            this.ui.renderFavorites(updatedFavorites);
            this.ui.updateFavoriteButton(isFavorite);
        } catch (error) {
            console.error('Failed to update favorites:', error);
            this.ui.showError('Failed to update favorites. Please try again.');
        }
    }

    toggleTemperatureUnit() {
        this.currentUnit = this.currentUnit === 'celsius' ? 'fahrenheit' : 'celsius';
        localStorage.setItem('temperatureUnit', this.currentUnit);
        
        this.ui.updateUnitDisplay(this.currentUnit);
        
        if (this.currentLocation) {
            this.updateWeatherData(this.currentLocation);
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
}); 