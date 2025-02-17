export class UI {
    constructor() {
        this.temperatureChart = null;
        this.precipitationChart = null;
        this.searchTimeout = null;
        this.toastTimeout = null;
    }

    showLoading() {
        document.getElementById('loading-overlay').classList.remove('hidden');
    }

    hideLoading() {
        document.getElementById('loading-overlay').classList.add('hidden');
    }

    showError(message) {
        const toast = document.getElementById('error-toast');
        const messageEl = document.getElementById('error-message');
        
        messageEl.textContent = message;
        toast.classList.remove('hidden');

        if (this.toastTimeout) {
            clearTimeout(this.toastTimeout);
        }

        this.toastTimeout = setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
    }

    showSuccess(message) {
        // Could be implemented similarly to showError with a success toast
        console.log('Success:', message);
    }

    updateWeatherDisplay(data, unit) {
        // Update current temperature
        const tempEl = document.getElementById('current-temp');
        const temp = unit === 'fahrenheit' ? this.convertToFahrenheit(data.temperature) : data.temperature;
        tempEl.textContent = temp;
        document.querySelector('.temperature .unit').textContent = unit === 'fahrenheit' ? '°F' : '°C';

        // Update weather icon
        const iconEl = document.getElementById('weather-icon');
        iconEl.className = `wi wi-owm-${data.icon}`;

        // Update weather description
        document.getElementById('weather-description').textContent = 
            this.capitalizeFirst(data.description);

        // Update high/low temperatures
        const highTemp = unit === 'fahrenheit' ? this.convertToFahrenheit(data.tempMax) : data.tempMax;
        const lowTemp = unit === 'fahrenheit' ? this.convertToFahrenheit(data.tempMin) : data.tempMin;
        document.getElementById('temp-high').textContent = highTemp;
        document.getElementById('temp-low').textContent = lowTemp;

        // Update other weather details
        document.getElementById('humidity').textContent = data.humidity;
        document.getElementById('wind-speed').textContent = data.windSpeed;

        // Update timestamp
        document.getElementById('location-date').textContent = 
            new Date(data.timestamp).toLocaleString();
    }

    updateForecast(forecast, unit) {
        const container = document.getElementById('forecast-container');
        container.innerHTML = '';

        const template = document.getElementById('forecast-card-template');

        forecast.forEach(day => {
            const card = template.content.cloneNode(true);
            
            // Set date
            card.querySelector('.forecast-date').textContent = 
                this.formatDate(day.date);

            // Set icon
            card.querySelector('.wi').className = `wi wi-owm-${day.icon}`;

            // Set temperatures
            const highTemp = unit === 'fahrenheit' ? 
                this.convertToFahrenheit(day.tempMax) : day.tempMax;
            const lowTemp = unit === 'fahrenheit' ? 
                this.convertToFahrenheit(day.tempMin) : day.tempMin;
            
            card.querySelector('.temp-high').textContent = highTemp;
            card.querySelector('.temp-low').textContent = lowTemp;

            // Set description
            card.querySelector('.forecast-description').textContent = 
                this.capitalizeFirst(day.description);

            container.appendChild(card);
        });
    }

    updateCharts(forecast) {
        this.updateTemperatureChart(forecast);
        this.updatePrecipitationChart(forecast);
    }

    updateTemperatureChart(forecast) {
        const ctx = document.getElementById('temperature-chart').getContext('2d');
        
        if (this.temperatureChart) {
            this.temperatureChart.destroy();
        }

        const labels = forecast.map(day => this.formatDate(day.date));
        const highTemps = forecast.map(day => day.tempMax);
        const lowTemps = forecast.map(day => day.tempMin);

        this.temperatureChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets: [
                    {
                        label: 'High',
                        data: highTemps,
                        borderColor: '#f6b93b',
                        backgroundColor: 'rgba(246, 185, 59, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: 'Low',
                        data: lowTemps,
                        borderColor: '#4a90e2',
                        backgroundColor: 'rgba(74, 144, 226, 0.1)',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: 'Temperature Forecast'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'Temperature (°C)'
                        }
                    }
                }
            }
        });
    }

    updatePrecipitationChart(forecast) {
        const ctx = document.getElementById('precipitation-chart').getContext('2d');
        
        if (this.precipitationChart) {
            this.precipitationChart.destroy();
        }

        const labels = forecast.map(day => this.formatDate(day.date));
        const precipitation = forecast.map(day => day.precipitationChance);

        this.precipitationChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: 'Precipitation Chance',
                    data: precipitation,
                    backgroundColor: 'rgba(74, 144, 226, 0.6)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: 'Precipitation Forecast'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Probability (%)'
                        }
                    }
                }
            }
        });
    }

    updateLocationName(name) {
        document.getElementById('location-name').textContent = name;
    }

    showSearchResults(locations) {
        const resultsContainer = document.getElementById('search-results');
        resultsContainer.innerHTML = '';

        if (locations.length === 0) {
            resultsContainer.innerHTML = '<p class="no-results">No locations found</p>';
            resultsContainer.classList.remove('hidden');
            return;
        }

        locations.forEach(location => {
            const div = document.createElement('div');
            div.className = 'search-result';
            div.textContent = location.name;
            div.dataset.location = JSON.stringify(location);
            resultsContainer.appendChild(div);
        });

        resultsContainer.classList.remove('hidden');
    }

    hideSearchResults() {
        document.getElementById('search-results').classList.add('hidden');
    }

    renderFavorites(favorites) {
        const container = document.getElementById('favorites-list');
        container.innerHTML = '';

        const template = document.getElementById('favorite-location-template');

        favorites.forEach(location => {
            const favorite = template.content.cloneNode(true);
            
            favorite.querySelector('.location-name').textContent = location.name;
            
            // Add click handler to load this location
            favorite.querySelector('.favorite-location').addEventListener('click', () => {
                this.handleFavoriteClick(location);
            });

            // Add click handler to remove button
            favorite.querySelector('.remove-favorite').addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleRemoveFavorite(location);
            });

            container.appendChild(favorite);
        });
    }

    updateFavoriteButton(isFavorite) {
        const button = document.getElementById('add-favorite');
        const icon = button.querySelector('i');
        
        if (isFavorite) {
            icon.className = 'fas fa-heart';
            button.title = 'Remove from favorites';
        } else {
            icon.className = 'far fa-heart';
            button.title = 'Add to favorites';
        }
    }

    updateUnitDisplay(unit) {
        const button = document.getElementById('unit-toggle');
        button.textContent = unit === 'fahrenheit' ? '°F' : '°C';
    }

    toggleTheme() {
        document.body.classList.toggle('dark-theme');
        
        const themeToggle = document.getElementById('theme-toggle');
        const isDark = document.body.classList.contains('dark-theme');
        
        themeToggle.innerHTML = isDark ? 
            '<i class="fas fa-sun"></i>' : 
            '<i class="fas fa-moon"></i>';

        localStorage.setItem('theme', isDark ? 'dark' : 'light');

        // Update charts theme if they exist
        if (this.temperatureChart) {
            this.updateChartTheme(this.temperatureChart);
        }
        if (this.precipitationChart) {
            this.updateChartTheme(this.precipitationChart);
        }
    }

    updateChartTheme(chart) {
        const isDark = document.body.classList.contains('dark-theme');
        const textColor = isDark ? '#ffffff' : '#2c3e50';

        chart.options.plugins.legend.labels.color = textColor;
        chart.options.plugins.title.color = textColor;
        chart.options.scales.x.ticks.color = textColor;
        chart.options.scales.y.ticks.color = textColor;
        chart.options.scales.x.grid.color = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
        chart.options.scales.y.grid.color = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

        chart.update();
    }

    formatDate(date) {
        return new Date(date).toLocaleDateString(undefined, {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    convertToFahrenheit(celsius) {
        return Math.round((celsius * 9/5) + 32);
    }

    convertToCelsius(fahrenheit) {
        return Math.round((fahrenheit - 32) * 5/9);
    }
} 