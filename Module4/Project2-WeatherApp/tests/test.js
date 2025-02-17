import { WeatherService } from '../js/weather.js';
import { LocationService } from '../js/location.js';
import { Cache } from '../js/cache.js';
import { UI } from '../js/ui.js';

// Mock weather data for testing
const mockWeatherData = {
    current: {
        temp: 20,
        humidity: 65,
        wind_speed: 5.5,
        weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }]
    },
    daily: [
        {
            dt: Date.now() / 1000,
            temp: { min: 15, max: 25 },
            weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }]
        }
    ]
};

const mockLocationData = {
    name: 'London',
    lat: 51.5074,
    lon: -0.1278,
    country: 'GB'
};

class TestRunner {
    constructor() {
        this.results = [];
        this.passCount = 0;
        this.totalTests = 0;
        this.weatherService = null;
        this.locationService = null;
        this.cache = null;
        this.ui = null;
    }

    async setup() {
        // Clear localStorage
        localStorage.clear();
        
        // Mock the fetch API
        global.fetch = this.mockFetch.bind(this);
        
        // Initialize components with mocked dependencies
        this.cache = new Cache();
        this.weatherService = new WeatherService('mock-api-key');
        this.locationService = new LocationService();
        this.ui = new UI();
        
        // Reset results
        this.results = [];
        this.passCount = 0;
        this.totalTests = 0;
        
        // Set up DOM test environment
        document.getElementById('test-environment').innerHTML = `
            <div id="location-name"></div>
            <div id="current-temp"></div>
            <div id="weather-description"></div>
            <div id="forecast-container"></div>
        `;
    }

    async teardown() {
        localStorage.clear();
        document.getElementById('test-environment').innerHTML = '';
        // Restore original fetch
        global.fetch = window.fetch;
    }

    mockFetch(url) {
        // Mock different API endpoints
        if (url.includes('weather')) {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockWeatherData)
            });
        } else if (url.includes('geo')) {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve([mockLocationData])
            });
        }
        
        return Promise.reject(new Error('Not found'));
    }

    async runTests() {
        await this.setup();
        
        // Run all tests
        await this.testLocationSearch();
        await this.testWeatherDataFetching();
        await this.testGeolocation();
        await this.testDataCaching();
        await this.testUIUpdates();
        await this.testUnitConversion();
        
        // Display results
        this.displayResults();
        
        await this.teardown();
    }

    async assert(condition, message) {
        if (!condition) {
            throw new Error(message);
        }
    }

    addResult(testName, passed, error = null) {
        this.results.push({ testName, passed, error });
        if (passed) this.passCount++;
        this.totalTests++;
    }

    displayResults() {
        const container = document.getElementById('test-results');
        const summary = document.getElementById('test-summary');
        
        this.results.forEach(result => {
            const div = document.createElement('div');
            div.className = `test-result ${result.passed ? 'pass' : 'fail'}`;
            div.textContent = `${result.passed ? '✅' : '❌'} ${result.testName}`;
            
            if (!result.passed && result.error) {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'error-message';
                errorDiv.textContent = result.error;
                div.appendChild(errorDiv);
            }
            
            container.appendChild(div);
        });

        summary.textContent = `Passed ${this.passCount} of ${this.totalTests} tests (${Math.round(this.passCount/this.totalTests*100)}%)`;
    }

    // Test Cases
    async testLocationSearch() {
        try {
            const locations = await this.locationService.searchLocations('London');
            
            await this.assert(Array.isArray(locations), 'Search results should be an array');
            await this.assert(locations.length > 0, 'Search should return results');
            await this.assert(locations[0].name === 'London', 'Location name should match');
            
            this.addResult('Location Search', true);
        } catch (error) {
            this.addResult('Location Search', false, error.message);
        }
    }

    async testWeatherDataFetching() {
        try {
            const weather = await this.weatherService.getCurrentWeather(
                mockLocationData.lat,
                mockLocationData.lon
            );
            
            await this.assert(weather.temp === 20, 'Temperature should match mock data');
            await this.assert(weather.humidity === 65, 'Humidity should match mock data');
            
            const forecast = await this.weatherService.getForecast(
                mockLocationData.lat,
                mockLocationData.lon
            );
            
            await this.assert(Array.isArray(forecast), 'Forecast should be an array');
            await this.assert(forecast.length > 0, 'Forecast should contain data');
            
            this.addResult('Weather Data Fetching', true);
        } catch (error) {
            this.addResult('Weather Data Fetching', false, error.message);
        }
    }

    async testGeolocation() {
        try {
            // Mock geolocation API
            const mockGeolocation = {
                getCurrentPosition: (success) => {
                    success({
                        coords: {
                            latitude: mockLocationData.lat,
                            longitude: mockLocationData.lon
                        }
                    });
                }
            };
            
            navigator.geolocation = mockGeolocation;
            
            const position = await this.locationService.getCurrentPosition();
            
            await this.assert(position.coords.latitude === mockLocationData.lat, 'Latitude should match');
            await this.assert(position.coords.longitude === mockLocationData.lon, 'Longitude should match');
            
            this.addResult('Geolocation', true);
        } catch (error) {
            this.addResult('Geolocation', false, error.message);
        }
    }

    async testDataCaching() {
        try {
            const location = {
                name: 'London',
                lat: mockLocationData.lat,
                lon: mockLocationData.lon
            };
            
            // Cache weather data
            await this.cache.cacheWeatherData(
                location,
                mockWeatherData.current,
                mockWeatherData.daily
            );
            
            // Retrieve cached data
            const cachedData = await this.cache.getCachedWeatherData(location);
            
            await this.assert(cachedData !== null, 'Cached data should exist');
            await this.assert(
                cachedData.current.temp === mockWeatherData.current.temp,
                'Cached temperature should match'
            );
            
            this.addResult('Data Caching', true);
        } catch (error) {
            this.addResult('Data Caching', false, error.message);
        }
    }

    async testUIUpdates() {
        try {
            // Update UI with mock weather data
            this.ui.updateWeatherDisplay(mockWeatherData.current, 'C');
            
            const tempElement = document.getElementById('current-temp');
            const descElement = document.getElementById('weather-description');
            
            await this.assert(
                tempElement.textContent.includes('20'),
                'Temperature should be displayed'
            );
            await this.assert(
                descElement.textContent.includes('clear sky'),
                'Weather description should be displayed'
            );
            
            this.addResult('UI Updates', true);
        } catch (error) {
            this.addResult('UI Updates', false, error.message);
        }
    }

    async testUnitConversion() {
        try {
            const celsiusTemp = 20;
            const fahrenheitTemp = this.weatherService.convertToFahrenheit(celsiusTemp);
            const backToCelsius = this.weatherService.convertToCelsius(fahrenheitTemp);
            
            await this.assert(
                fahrenheitTemp === 68,
                'Celsius to Fahrenheit conversion should be correct'
            );
            await this.assert(
                Math.round(backToCelsius) === celsiusTemp,
                'Fahrenheit to Celsius conversion should be correct'
            );
            
            this.addResult('Unit Conversion', true);
        } catch (error) {
            this.addResult('Unit Conversion', false, error.message);
        }
    }
}

// Initialize and run tests when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    const runner = new TestRunner();
    await runner.runTests();
}); 