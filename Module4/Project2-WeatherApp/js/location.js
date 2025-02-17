export class LocationService {
    constructor() {
        this.geocodingUrl = 'https://api.openweathermap.org/geo/1.0';
        this.searchCache = new Map();
        this.cacheTimeout = 1000 * 60 * 60; // 1 hour
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
        // Check cache first
        const cacheKey = query.toLowerCase();
        const cachedResult = this.searchCache.get(cacheKey);
        
        if (cachedResult && Date.now() - cachedResult.timestamp < this.cacheTimeout) {
            return cachedResult.data;
        }

        try {
            const endpoint = `${this.geocodingUrl}/direct`;
            const params = {
                q: query,
                limit: 5,
                appid: process.env.WEATHER_API_KEY
            };

            const response = await this.makeRequest(endpoint, params);
            
            const locations = response.map(location => ({
                name: this.formatLocationName(location),
                lat: location.lat,
                lon: location.lon,
                country: location.country,
                state: location.state
            }));

            // Cache the results
            this.searchCache.set(cacheKey, {
                data: locations,
                timestamp: Date.now()
            });

            return locations;
        } catch (error) {
            console.error('Location search error:', error);
            throw new Error('Failed to search locations');
        }
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
        this.searchCache.clear();
    }
} 