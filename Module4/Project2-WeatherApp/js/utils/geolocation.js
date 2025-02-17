import { GEOLOCATION_OPTIONS } from '../config.js';

class GeolocationService {
    constructor() {
        this.watchId = null;
        this.lastPosition = null;
        this.isWatching = false;
    }

    isSupported() {
        return 'geolocation' in navigator;
    }

    async getCurrentPosition() {
        if (!this.isSupported()) {
            throw new Error('Geolocation is not supported by this browser');
        }

        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    resolve,
                    reject,
                    GEOLOCATION_OPTIONS
                );
            });

            this.lastPosition = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy,
                timestamp: position.timestamp
            };

            return this.lastPosition;
        } catch (error) {
            const errorMessage = this.getErrorMessage(error);
            throw new Error(`Geolocation error: ${errorMessage}`);
        }
    }

    startWatching(onUpdate, onError) {
        if (!this.isSupported()) {
            throw new Error('Geolocation is not supported by this browser');
        }

        if (this.isWatching) {
            console.warn('Location watching is already active');
            return;
        }

        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
                this.lastPosition = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                    timestamp: position.timestamp
                };
                onUpdate(this.lastPosition);
            },
            (error) => {
                const errorMessage = this.getErrorMessage(error);
                if (onError) onError(errorMessage);
            },
            GEOLOCATION_OPTIONS
        );

        this.isWatching = true;
    }

    stopWatching() {
        if (this.watchId !== null) {
            navigator.geolocation.clearWatch(this.watchId);
            this.watchId = null;
            this.isWatching = false;
        }
    }

    getLastPosition() {
        return this.lastPosition;
    }

    getErrorMessage(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                return 'User denied the request for geolocation';
            case error.POSITION_UNAVAILABLE:
                return 'Location information is unavailable';
            case error.TIMEOUT:
                return 'The request to get user location timed out';
            default:
                return 'An unknown error occurred';
        }
    }

    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Earth's radius in kilometers
        const dLat = this.toRad(lat2 - lat1);
        const dLon = this.toRad(lon2 - lon1);
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    toRad(degrees) {
        return degrees * (Math.PI / 180);
    }
}

export const geolocationService = new GeolocationService(); 