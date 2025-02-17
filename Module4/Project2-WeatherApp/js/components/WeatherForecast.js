export class WeatherForecast {
    constructor() {
        this.forecastContainer = document.getElementById('forecast');
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Listen for unit changes
        document.addEventListener('unit-changed', () => {
            if (this.lastForecast) {
                this.updateForecast(this.lastForecast);
            }
        });
    }

    updateForecast(forecast) {
        if (!this.forecastContainer) return;

        this.lastForecast = forecast;
        const unit = document.documentElement.getAttribute('data-unit') || 'celsius';
        const symbol = unit === 'celsius' ? '°C' : '°F';

        this.forecastContainer.innerHTML = `
            <div class="forecast-list">
                ${forecast.list.slice(0, 5).map(item => this.createForecastItem(item, unit, symbol)).join('')}
            </div>
        `;
    }

    createForecastItem(item, unit, symbol) {
        const temp = unit === 'celsius' ? item.temp : (item.temp * 9/5) + 32;
        const date = new Date(item.dt * 1000);
        const day = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
        const time = new Intl.DateTimeFormat('en-US', { hour: 'numeric' }).format(date);

        return `
            <div class="forecast-item">
                <div class="forecast-day">${day}</div>
                <div class="forecast-time">${time}</div>
                <img src="/assets/icons/weather/${item.icon}.png" 
                     alt="${item.description}"
                     class="forecast-icon">
                <div class="forecast-temp">${Math.round(temp)}${symbol}</div>
                <div class="forecast-description">${item.description}</div>
                <div class="forecast-details">
                    <span class="humidity">
                        <i class="humidity-icon"></i>
                        ${item.humidity}%
                    </span>
                    <span class="wind">
                        <i class="wind-icon"></i>
                        ${item.windSpeed} m/s
                    </span>
                </div>
            </div>
        `;
    }
} 