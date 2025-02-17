import { Cache } from './cache.js';

export class LocationService {
    constructor() {
        this.geocodingUrl = 'https://api.openweathermap.org/geo/1.0';
        this.cache = new Cache();
        this.init();
    }

    async init() {
        await this.cache.init();
    }

    async getCurrentPosition() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation is not supported by your browser'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                position => resolve(position),
                error => {
                    console.error('Geolocation error:', error);
                    reject(new Error('Failed to get your location'));
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                }
            );
        });
    }

    async searchLocations(query) {
        try {
            const endpoint = `${this.geocodingUrl}/direct`;
            const params = {
                q: query,
                limit: 5,
                appid: process.env.WEATHER_API_KEY
            };

            const response = await this.makeRequest(endpoint, params);
            
            return response.map(location => ({
                name: this.formatLocationName(location),
                lat: location.lat,
                lon: location.lon,
                country: location.country,
                state: location.state
            }));
        } catch (error) {
            console.error('Location search error:', error);
            throw new Error('Failed to search locations');
        }
    }

    async addFavorite(location) {
        await this.cache.addFavorite(location);
    }

    async removeFavorite(location) {
        await this.cache.removeFavorite(location);
    }

    async getFavorites() {
        return await this.cache.getFavorites();
    }

    async reverseGeocode(lat, lon) {
        try {
            const endpoint = `${this.geocodingUrl}/reverse`;
            const params = {
                lat,
                lon,
                limit: 1,
                appid: process.env.WEATHER_API_KEY
            };

            const response = await this.makeRequest(endpoint, params);
            
            if (!response.length) {
                throw new Error('No location found');
            }

            const location = response[0];
            return {
                name: this.formatLocationName(location),
                lat: location.lat,
                lon: location.lon,
                country: location.country,
                state: location.state
            };
        } catch (error) {
            console.error('Reverse geocoding error:', error);
            throw new Error('Failed to get location name');
        }
    }

    async makeRequest(endpoint, params) {
        const queryString = new URLSearchParams(params).toString();
        const url = `${endpoint}?${queryString}`;

        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API request error:', error);
            throw new Error('Failed to fetch location data');
        }
    }

    formatLocationName(location) {
        const parts = [];

        if (location.name) {
            parts.push(location.name);
        }

        if (location.state && location.state !== location.name) {
            parts.push(location.state);
        }

        if (location.country) {
            parts.push(location.country);
        }

        return parts.join(', ');
    }

    clearCache() {
        this.cache.clear();
    }
} 