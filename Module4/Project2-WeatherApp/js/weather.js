export class WeatherService {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.openweathermap.org/data/2.5';
        this.iconBaseUrl = 'https://openweathermap.org/img/wn';
        this.requestQueue = [];
        this.isProcessing = false;
        this.rateLimitDelay = 1000; // 1 second between requests
    }

    async getCurrentWeather(lat, lon) {
        const endpoint = `${this.baseUrl}/weather`;
        const params = {
            lat,
            lon,
            appid: this.apiKey,
            units: 'metric'
        };

        try {
            const response = await this.queueRequest(endpoint, params);
            return this.processCurrentWeather(response);
        } catch (error) {
            console.error('Error fetching current weather:', error);
            throw new Error('Failed to fetch current weather data');
        }
    }

    async getForecast(lat, lon) {
        const endpoint = `${this.baseUrl}/forecast`;
        const params = {
            lat,
            lon,
            appid: this.apiKey,
            units: 'metric'
        };

        try {
            const response = await this.queueRequest(endpoint, params);
            return this.processForecast(response);
        } catch (error) {
            console.error('Error fetching forecast:', error);
            throw new Error('Failed to fetch forecast data');
        }
    }

    async queueRequest(endpoint, params) {
        return new Promise((resolve, reject) => {
            this.requestQueue.push({
                endpoint,
                params,
                resolve,
                reject
            });

            if (!this.isProcessing) {
                this.processQueue();
            }
        });
    }

    async processQueue() {
        if (this.requestQueue.length === 0) {
            this.isProcessing = false;
            return;
        }

        this.isProcessing = true;
        const { endpoint, params, resolve, reject } = this.requestQueue.shift();

        try {
            const queryString = new URLSearchParams(params).toString();
            const url = `${endpoint}?${queryString}`;
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            resolve(data);
        } catch (error) {
            reject(error);
        }

        // Rate limiting
        await new Promise(resolve => setTimeout(resolve, this.rateLimitDelay));
        this.processQueue();
    }

    processCurrentWeather(data) {
        return {
            temperature: Math.round(data.main.temp),
            feelsLike: Math.round(data.main.feels_like),
            tempMin: Math.round(data.main.temp_min),
            tempMax: Math.round(data.main.temp_max),
            humidity: data.main.humidity,
            windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
            windDirection: data.wind.deg,
            description: data.weather[0].description,
            icon: this.getWeatherIcon(data.weather[0].icon),
            sunrise: new Date(data.sys.sunrise * 1000),
            sunset: new Date(data.sys.sunset * 1000),
            pressure: data.main.pressure,
            visibility: data.visibility,
            timestamp: new Date(data.dt * 1000)
        };
    }

    processForecast(data) {
        // Group forecast by day
        const dailyForecasts = data.list.reduce((acc, forecast) => {
            const date = new Date(forecast.dt * 1000).toLocaleDateString();
            
            if (!acc[date]) {
                acc[date] = {
                    temps: [],
                    icons: [],
                    descriptions: [],
                    precipitation: [],
                    date: new Date(forecast.dt * 1000)
                };
            }

            acc[date].temps.push(forecast.main.temp);
            acc[date].icons.push(forecast.weather[0].icon);
            acc[date].descriptions.push(forecast.weather[0].description);
            acc[date].precipitation.push(forecast.pop * 100); // Convert to percentage

            return acc;
        }, {});

        // Process daily data
        return Object.values(dailyForecasts).map(day => ({
            date: day.date,
            tempMax: Math.round(Math.max(...day.temps)),
            tempMin: Math.round(Math.min(...day.temps)),
            icon: this.getMostFrequentIcon(day.icons),
            description: this.getMostFrequentDescription(day.descriptions),
            precipitationChance: Math.round(Math.max(...day.precipitation))
        })).slice(0, 5); // Limit to 5 days
    }

    getWeatherIcon(iconCode) {
        return `${this.iconBaseUrl}/${iconCode}@2x.png`;
    }

    getMostFrequentIcon(icons) {
        return this.getWeatherIcon(
            icons.sort((a, b) =>
                icons.filter(v => v === a).length - icons.filter(v => v === b).length
            ).pop()
        );
    }

    getMostFrequentDescription(descriptions) {
        return descriptions.sort((a, b) =>
            descriptions.filter(v => v === a).length - descriptions.filter(v => v === b).length
        ).pop();
    }

    convertToFahrenheit(celsius) {
        return Math.round((celsius * 9/5) + 32);
    }

    convertToCelsius(fahrenheit) {
        return Math.round((fahrenheit - 32) * 5/9);
    }

    getWindDirection(degrees) {
        const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
                          'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
        const index = Math.round(degrees / 22.5) % 16;
        return directions[index];
    }
} 