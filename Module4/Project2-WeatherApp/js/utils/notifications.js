class NotificationManager {
    constructor() {
        this.hasPermission = false;
        this.notifications = [];
        this.initialize();
    }

    async initialize() {
        if (!('Notification' in window)) {
            console.warn('This browser does not support notifications');
            return;
        }

        if (Notification.permission === 'granted') {
            this.hasPermission = true;
        } else if (Notification.permission !== 'denied') {
            const permission = await Notification.requestPermission();
            this.hasPermission = permission === 'granted';
        }
    }

    async requestPermission() {
        if (!('Notification' in window)) return false;

        try {
            const permission = await Notification.requestPermission();
            this.hasPermission = permission === 'granted';
            return this.hasPermission;
        } catch (error) {
            console.error('Error requesting notification permission:', error);
            return false;
        }
    }

    async showWeatherAlert(alert) {
        if (!this.hasPermission) {
            console.warn('Notification permission not granted');
            return false;
        }

        try {
            const notification = new Notification('Weather Alert', {
                body: alert.description,
                icon: '/assets/icons/alert.png',
                tag: `weather-alert-${alert.id}`,
                data: alert
            });

            notification.onclick = () => {
                window.focus();
                notification.close();
            };

            this.notifications.push(notification);
            return true;
        } catch (error) {
            console.error('Error showing notification:', error);
            return false;
        }
    }

    async showWeatherUpdate(data) {
        if (!this.hasPermission) return false;

        try {
            const notification = new Notification('Weather Update', {
                body: `Current temperature: ${data.temp}°C\n${data.description}`,
                icon: `/assets/icons/weather/${data.icon}.png`,
                tag: 'weather-update',
                data: data
            });

            notification.onclick = () => {
                window.focus();
                notification.close();
            };

            this.notifications.push(notification);
            return true;
        } catch (error) {
            console.error('Error showing weather update:', error);
            return false;
        }
    }

    closeAll() {
        this.notifications.forEach(notification => {
            notification.close();
        });
        this.notifications = [];
    }

    isSupported() {
        return 'Notification' in window;
    }

    getPermissionStatus() {
        if (!this.isSupported()) return 'unsupported';
        return Notification.permission;
    }
}

export const notificationManager = new NotificationManager(); 