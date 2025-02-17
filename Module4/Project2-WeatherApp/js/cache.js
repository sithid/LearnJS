export class Cache {
    constructor() {
        this.weatherKey = 'weather_data';
        this.favoritesKey = 'favorite_locations';
        this.cacheTimeout = 1000 * 60 * 30; // 30 minutes
    }

    async init() {
        try {
            // Check if localStorage is available
            if (!this.isStorageAvailable()) {
                throw new Error('Local storage is not available');
            }

            // Initialize favorites if not exists
            if (!localStorage.getItem(this.favoritesKey)) {
                localStorage.setItem(this.favoritesKey, JSON.stringify([]));
            }

            // Clean up expired weather data
            this.cleanExpiredData();
        } catch (error) {
            console.error('Cache initialization error:', error);
            throw new Error('Failed to initialize cache');
        }
    }

    async cacheWeatherData(location, currentWeather, forecast) {
        try {
            const cacheKey = this.getLocationKey(location);
            const data = {
                currentWeather,
                forecast,
                timestamp: Date.now()
            };

            const cachedData = this.getCachedWeatherData() || {};
            cachedData[cacheKey] = data;

            localStorage.setItem(this.weatherKey, JSON.stringify(cachedData));
        } catch (error) {
            console.error('Error caching weather data:', error);
            throw new Error('Failed to cache weather data');
        }
    }

    async getCachedWeatherData(location) {
        try {
            const cachedData = this.getCachedWeatherData();
            if (!cachedData) return null;

            const cacheKey = this.getLocationKey(location);
            const data = cachedData[cacheKey];

            if (!data) return null;

            // Check if data is expired
            if (Date.now() - data.timestamp > this.cacheTimeout) {
                this.removeWeatherData(location);
                return null;
            }

            return data;
        } catch (error) {
            console.error('Error retrieving cached weather data:', error);
            return null;
        }
    }

    async addFavorite(location) {
        try {
            const favorites = await this.getFavorites();
            
            // Check if location already exists
            const exists = favorites.some(fav => 
                fav.lat === location.lat && fav.lon === location.lon
            );

            if (!exists) {
                favorites.push(location);
                localStorage.setItem(this.favoritesKey, JSON.stringify(favorites));
            }
        } catch (error) {
            console.error('Error adding favorite:', error);
            throw new Error('Failed to add favorite location');
        }
    }

    async removeFavorite(location) {
        try {
            const favorites = await this.getFavorites();
            const updatedFavorites = favorites.filter(fav => 
                !(fav.lat === location.lat && fav.lon === location.lon)
            );
            
            localStorage.setItem(this.favoritesKey, JSON.stringify(updatedFavorites));
        } catch (error) {
            console.error('Error removing favorite:', error);
            throw new Error('Failed to remove favorite location');
        }
    }

    async getFavorites() {
        try {
            const favorites = localStorage.getItem(this.favoritesKey);
            return favorites ? JSON.parse(favorites) : [];
        } catch (error) {
            console.error('Error getting favorites:', error);
            return [];
        }
    }

    removeWeatherData(location) {
        try {
            const cachedData = this.getCachedWeatherData();
            if (!cachedData) return;

            const cacheKey = this.getLocationKey(location);
            delete cachedData[cacheKey];

            localStorage.setItem(this.weatherKey, JSON.stringify(cachedData));
        } catch (error) {
            console.error('Error removing weather data:', error);
        }
    }

    cleanExpiredData() {
        try {
            const cachedData = this.getCachedWeatherData();
            if (!cachedData) return;

            const now = Date.now();
            let hasExpired = false;

            Object.entries(cachedData).forEach(([key, data]) => {
                if (now - data.timestamp > this.cacheTimeout) {
                    delete cachedData[key];
                    hasExpired = true;
                }
            });

            if (hasExpired) {
                localStorage.setItem(this.weatherKey, JSON.stringify(cachedData));
            }
        } catch (error) {
            console.error('Error cleaning expired data:', error);
        }
    }

    getCachedWeatherData() {
        const data = localStorage.getItem(this.weatherKey);
        return data ? JSON.parse(data) : null;
    }

    getLocationKey(location) {
        return `${location.lat},${location.lon}`;
    }

    isStorageAvailable() {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (error) {
            return false;
        }
    }

    clearAll() {
        try {
            localStorage.removeItem(this.weatherKey);
            localStorage.removeItem(this.favoritesKey);
        } catch (error) {
            console.error('Error clearing cache:', error);
            throw new Error('Failed to clear cache');
        }
    }
} 