// SKY-INFONGA Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeSwitch = document.getElementById('themeSwitch');
    if (themeSwitch) {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeSwitch.checked = true;
        }
        
        themeSwitch.addEventListener('change', function() {
            if (this.checked) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
        });
    }
    
    // Dashboard functionality
    const searchBtn = document.getElementById('searchBtn');
    const cityInput = document.getElementById('cityInput');
    
    if (searchBtn && cityInput) {
        searchBtn.addEventListener('click', function() {
            const city = cityInput.value.trim();
            if (city) {
                showApiModal(city);
            } else {
                alert('Please enter a city or country name');
            }
        });
        
        cityInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }
    
    // Modal handling
    const apiModal = document.getElementById('apiModal');
    const closeModal = document.querySelector('.close-modal');
    const submitKeys = document.getElementById('submitKeys');
    let currentCity = '';
    
    function showApiModal(city) {
        currentCity = city;
        if (apiModal) {
            apiModal.classList.add('show');
        }
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            apiModal.classList.remove('show');
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === apiModal) {
            apiModal.classList.remove('show');
        }
    });
    
    // Submit API keys
    if (submitKeys) {
        submitKeys.addEventListener('click', function() {
            const openweatherKey = document.getElementById('openweatherKey').value.trim();
            const opencageKey = document.getElementById('opencageKey').value.trim();
            const shodanKey = document.getElementById('shodanKey').value.trim();
            
            if (!openweatherKey || !opencageKey) {
                alert('OpenWeather and OpenCage API keys are required');
                return;
            }
            
            // Close API modal
            apiModal.classList.remove('show');
            
            // Show loading modal
            showLoadingModal();
            
            // Fetch weather data
            fetchWeatherData(currentCity, openweatherKey, opencageKey, shodanKey);
        });
    }
    
    // Loading modal
    const loadingModal = document.getElementById('loadingModal');
    
    function showLoadingModal() {
        if (loadingModal) {
            loadingModal.classList.add('show');
            
            // Simulate loading logs
            const logs = document.querySelectorAll('.log-entry');
            logs.forEach((log, index) => {
                setTimeout(() => {
                    log.style.opacity = '1';
                }, index * 500);
            });
        }
    }
    
    function hideLoadingModal() {
        if (loadingModal) {
            loadingModal.classList.remove('show');
        }
    }
    
    // Fetch weather data
    function fetchWeatherData(city, openweatherKey, opencageKey, shodanKey) {
        fetch('/get_weather', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                city: city,
                openweather_key: openweatherKey,
                opencage_key: opencageKey,
                shodan_key: shodanKey
            })
        })
        .then(response => response.json())
        .then(data => {
            hideLoadingModal();
            
            if (data.error) {
                alert('Error: ' + data.error);
            } else {
                // Store data in session storage
                sessionStorage.setItem('weatherData', JSON.stringify(data));
                // Redirect to results page
                window.location.href = '/results';
            }
        })
        .catch(error => {
            hideLoadingModal();
            alert('Error fetching weather data: ' + error);
        });
    }
    
    // Results page functionality
    if (window.location.pathname === '/results') {
        displayWeatherResults();
    }
    
    function displayWeatherResults() {
        const weatherData = sessionStorage.getItem('weatherData');
        if (!weatherData) {
            window.location.href = '/dashboard';
            return;
        }
        
        const data = JSON.parse(weatherData);
        const resultsContainer = document.getElementById('weatherResults');
        
        if (resultsContainer) {
            const weatherIcon = getWeatherIcon(data.weather.icon);
            const windDirection = getWindDirection(data.wind.deg);
            
            resultsContainer.innerHTML = `
                <div class="location-header">
                    <span class="country-flag">${data.flag}</span>
                    <div class="location-info">
                        <h2>${data.city}, ${data.country}</h2>
                        <p><i class="fas fa-map-marker-alt"></i> ${data.coordinates.lat.toFixed(4)}°, ${data.coordinates.lon.toFixed(4)}°</p>
                    </div>
                </div>
                
                <div class="weather-grid">
                    <div class="weather-card">
                        <i class="fas ${weatherIcon}"></i>
                        <h3>Temperature</h3>
                        <div class="value">${data.temperature.current}°C</div>
                        <div class="unit">Feels like ${data.temperature.feels_like}°C</div>
                    </div>
                    
                    <div class="weather-card">
                        <i class="fas fa-wind"></i>
                        <h3>Wind</h3>
                        <div class="value">${data.wind.speed} m/s</div>
                        <div class="unit">${windDirection}</div>
                    </div>
                    
                    <div class="weather-card">
                        <i class="fas fa-tint"></i>
                        <h3>Humidity</h3>
                        <div class="value">${data.humidity}%</div>
                    </div>
                    
                    <div class="weather-card">
                        <i class="fas fa-compress-alt"></i>
                        <h3>Pressure</h3>
                        <div class="value">${data.pressure} hPa</div>
                    </div>
                </div>
                
                <div class="temperature-details">
                    <div class="temp-item">
                        <div class="temp-label">Min Temperature</div>
                        <div class="temp-value">${data.temperature.min}°C</div>
                    </div>
                    <div class="temp-item">
                        <div class="temp-label">Max Temperature</div>
                        <div class="temp-value">${data.temperature.max}°C</div>
                    </div>
                </div>
                
                <div class="weather-description">
                    <h3>${data.weather.main}</h3>
                    <p>${data.weather.description}</p>
                </div>
                
                <div class="weather-grid">
                    <div class="weather-card">
                        <i class="fas fa-cloud"></i>
                        <h3>Cloud Cover</h3>
                        <div class="value">${data.clouds}%</div>
                    </div>
                    
                    <div class="weather-card">
                        <i class="fas fa-eye"></i>
                        <h3>Visibility</h3>
                        <div class="value">${data.visibility} km</div>
                    </div>
                    
                    <div class="weather-card">
                        <i class="fas fa-sun"></i>
                        <h3>Sunrise</h3>
                        <div class="value">${data.sun.rise}</div>
                    </div>
                    
                    <div class="weather-card">
                        <i class="fas fa-moon"></i>
                        <h3>Sunset</h3>
                        <div class="value">${data.sun.set}</div>
                    </div>
                </div>
            `;
        }
        
        // Back button functionality
        const backBtn = document.getElementById('backToDashboard');
        if (backBtn) {
            backBtn.addEventListener('click', function() {
                window.location.href = '/dashboard';
            });
        }
        
        // Refresh button functionality
        const refreshBtn = document.getElementById('refreshData');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', function() {
                window.location.href = '/dashboard';
            });
        }
    }
    
    // Helper function to get weather icon
    function getWeatherIcon(iconCode) {
        const iconMap = {
            '01d': 'fa-sun',
            '01n': 'fa-moon',
            '02d': 'fa-cloud-sun',
            '02n': 'fa-cloud-moon',
            '03d': 'fa-cloud',
            '03n': 'fa-cloud',
            '04d': 'fa-cloud',
            '04n': 'fa-cloud',
            '09d': 'fa-cloud-rain',
            '09n': 'fa-cloud-rain',
            '10d': 'fa-cloud-sun-rain',
            '10n': 'fa-cloud-moon-rain',
            '11d': 'fa-bolt',
            '11n': 'fa-bolt',
            '13d': 'fa-snowflake',
            '13n': 'fa-snowflake',
            '50d': 'fa-smog',
            '50n': 'fa-smog'
        };
        return iconMap[iconCode] || 'fa-cloud-sun';
    }
    
    // Helper function to get wind direction
    function getWindDirection(degrees) {
        const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
        const index = Math.round(degrees / 22.5) % 16;
        return directions[index];
    }
});
