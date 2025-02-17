export class WeatherUI {
    constructor() {
        this.currentWeatherContainer = document.getElementById('currentWeather');
        this.loadingIndicator = document.getElementById('loadingIndicator');
        this.errorContainer = document.getElementById('errorContainer');
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Unit toggle
        const unitToggle = document.getElementById('unitToggle');
        if (unitToggle) {
            unitToggle.addEventListener('click', () => {
                const currentUnit = document.documentElement.getAttribute('data-unit') || 'celsius';
                const newUnit = currentUnit === 'celsius' ? 'fahrenheit' : 'celsius';
                this.setUnit(newUnit);
            });
        }
    }

    updateCurrentWeather(data) {
        if (!this.currentWeatherContainer) return;

        const unit = document.documentElement.getAttribute('data-unit') || 'celsius';
        const temp = unit === 'celsius' ? data.temp : (data.temp * 9/5) + 32;
        const symbol = unit === 'celsius' ? '°C' : '°F';

        this.currentWeatherContainer.innerHTML = `
            <div class="weather-main">
                <img src="/assets/icons/weather/${data.icon}.png" 
                     alt="${data.description}"
                     class="weather-icon">
                <div class="temperature">${Math.round(temp)}${symbol}</div>
                <div class="description">${data.description}</div>
            </div>
            <div class="weather-details">
                <div class="detail">
                    <span class="label">Humidity</span>
                    <span class="value">${data.humidity}%</span>
                </div>
                <div class="detail">
                    <span class="label">Wind</span>
                    <span class="value">${data.windSpeed} m/s</span>
                </div>
                <div class="detail">
                    <span class="label">Pressure</span>
                    <span class="value">${data.pressure} hPa</span>
                </div>
            </div>
        `;
    }

    setUnit(unit) {
        document.documentElement.setAttribute('data-unit', unit);
        localStorage.setItem('weather-unit', unit);
        // Trigger a re-render of weather data
        const event = new CustomEvent('unit-changed', { detail: { unit } });
        document.dispatchEvent(event);
    }

    showLoading() {
        if (this.loadingIndicator) {
            this.loadingIndicator.classList.remove('hidden');
        }
    }

    hideLoading() {
        if (this.loadingIndicator) {
            this.loadingIndicator.classList.add('hidden');
        }
    }

    showError(message) {
        if (this.errorContainer) {
            this.errorContainer.textContent = message;
            this.errorContainer.classList.remove('hidden');
            setTimeout(() => {
                this.hideError();
            }, 5000);
        }
    }

    hideError() {
        if (this.errorContainer) {
            this.errorContainer.classList.add('hidden');
        }
    }
} 