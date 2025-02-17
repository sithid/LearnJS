import { CACHE_SETTINGS } from '../config.js';

class Cache {
    constructor(storageKey = 'weather-cache') {
        this.storageKey = storageKey;
        this.cache = this.loadCache();
    }

    loadCache() {
        try {
            const cached = localStorage.getItem(this.storageKey);
            return cached ? JSON.parse(cached) : {};
        } catch (error) {
            console.error('Error loading cache:', error);
            return {};
        }
    }

    saveCache() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.cache));
        } catch (error) {
            console.error('Error saving cache:', error);
            this.clearOldEntries(); // Try to free up space
        }
    }

    get(key) {
        const entry = this.cache[key];
        if (!entry) return null;

        if (this.isExpired(entry)) {
            this.delete(key);
            return null;
        }

        return entry.data;
    }

    set(key, data, customExpiry = null) {
        this.cache[key] = {
            data,
            timestamp: Date.now(),
            expiry: customExpiry || CACHE_SETTINGS.weatherDataExpiry
        };

        if (Object.keys(this.cache).length > CACHE_SETTINGS.maxCacheSize) {
            this.clearOldEntries();
        }

        this.saveCache();
    }

    delete(key) {
        delete this.cache[key];
        this.saveCache();
    }

    clear() {
        this.cache = {};
        this.saveCache();
    }

    isExpired(entry) {
        return Date.now() - entry.timestamp > entry.expiry;
    }

    clearOldEntries() {
        const entries = Object.entries(this.cache);
        const sortedEntries = entries.sort(([, a], [, b]) => b.timestamp - a.timestamp);
        
        // Keep only the most recent entries up to maxCacheSize
        this.cache = Object.fromEntries(
            sortedEntries.slice(0, CACHE_SETTINGS.maxCacheSize)
        );
        
        this.saveCache();
    }

    getCacheSize() {
        return Object.keys(this.cache).length;
    }

    getEntry(key) {
        return this.cache[key];
    }

    getAllKeys() {
        return Object.keys(this.cache);
    }
}

export const weatherCache = new Cache(); 