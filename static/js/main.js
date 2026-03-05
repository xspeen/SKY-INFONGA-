// SKY-INFONGA Main JavaScript - COMPLETE FIXED VERSION

document.addEventListener('DOMContentLoaded', function() {
    console.log("[DEBUG] SKY-INFONGA initialized");
    
    // ==================== THEME TOGGLE FUNCTIONALITY ====================
    const themeSwitch = document.getElementById('themeSwitch');
    if (themeSwitch) {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeSwitch.checked = true;
            console.log("[DEBUG] Dark mode enabled from saved preference");
        }
        
        themeSwitch.addEventListener('change', function() {
            if (this.checked) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                console.log("[DEBUG] Dark mode enabled");
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                console.log("[DEBUG] Light mode enabled");
            }
        });
    }
    
    // ==================== DASHBOARD FUNCTIONALITY ====================
    const searchBtn = document.getElementById('searchBtn');
    const cityInput = document.getElementById('cityInput');
    
    if (searchBtn && cityInput) {
        console.log("[DEBUG] Dashboard elements found");
        
        searchBtn.addEventListener('click', function() {
            const city = cityInput.value.trim();
            console.log("[DEBUG] Search clicked for city:", city);
            
            if (city) {
                showApiModal(city);
            } else {
                alert('⚠️ Please enter a city or country name');
                cityInput.focus();
            }
        });
        
        cityInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchBtn.click();
            }
        });
    }
    
    // ==================== MODAL HANDLING ====================
    const apiModal = document.getElementById('apiModal');
    const closeModal = document.querySelector('.close-modal');
    const submitKeys = document.getElementById('submitKeys');
    let currentCity = '';
    
    function showApiModal(city) {
        currentCity = city;
        if (apiModal) {
            apiModal.classList.add('show');
            // Clear previous inputs
            document.getElementById('openweatherKey').value = '';
            document.getElementById('opencageKey').value = '';
            document.getElementById('shodanKey').value = '';
            // Focus on first input
            setTimeout(() => {
                document.getElementById('openweatherKey').focus();
            }, 100);
            console.log("[DEBUG] API modal opened for city:", city);
        } else {
            console.error("[DEBUG] API modal element not found");
        }
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            apiModal.classList.remove('show');
            console.log("[DEBUG] API modal closed");
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === apiModal) {
            apiModal.classList.remove('show');
        }
    });
    
    // ==================== API KEY SUBMISSION ====================
    if (submitKeys) {
        submitKeys.addEventListener('click', function() {
            const openweatherKey = document.getElementById('openweatherKey').value.trim();
            const opencageKey = document.getElementById('opencageKey').value.trim();
            const shodanKey = document.getElementById('shodanKey').value.trim();
            
            console.log("[DEBUG] API keys submitted - OpenWeather: " + (openweatherKey ? '✓' : '✗') + 
                      ", OpenCage: " + (opencageKey ? '✓' : '✗') + 
                      ", Shodan: " + (shodanKey ? '✓' : '✗'));
            
            // Validate required keys
            if (!openweatherKey) {
                alert('❌ OpenWeather API key is required!\n\nGet one from: https://openweathermap.org/api');
                document.getElementById('openweatherKey').focus();
                return;
            }
            
            if (!opencageKey) {
                alert('❌ OpenCage API key is required!\n\nGet one from: https://opencagedata.com/');
                document.getElementById('opencageKey').focus();
                return;
            }
            
            // Close API modal
            apiModal.classList.remove('show');
            
            // Show loading modal with animation
            showLoadingModal();
            
            // Fetch weather data after a short delay
            setTimeout(() => {
                fetchWeatherData(currentCity, openweatherKey, opencageKey, shodanKey);
            }, 500);
        });
    }
    
    // ==================== LOADING MODAL FUNCTIONS ====================
    const loadingModal = document.getElementById('loadingModal');
    
    function showLoadingModal() {
        if (loadingModal) {
            // Reset logs visibility
            const logs = document.querySelectorAll('.log-entry');
            logs.forEach(log => {
                log.style.opacity = '0';
            });
            
            // Reset progress bar
            const progressFill = document.querySelector('.progress-fill');
            if (progressFill) {
                progressFill.style.animation = 'none';
                progressFill.offsetHeight; // Trigger reflow
                progressFill.style.animation = 'progress 3s ease forwards';
            }
            
            loadingModal.classList.add('show');
            console.log("[DEBUG] Loading modal shown");
            
            // Animate logs sequentially
            logs.forEach((log, index) => {
                setTimeout(() => {
                    log.style.opacity = '1';
                    console.log("[DEBUG] Log " + (index + 1) + " completed");
                }, index * 600);
            });
        }
    }
    
    function hideLoadingModal() {
        if (loadingModal) {
            loadingModal.classList.remove('show');
            console.log("[DEBUG] Loading modal hidden");
        }
    }
    
    // ==================== WEATHER DATA FETCHING ====================
    function fetchWeatherData(city, openweatherKey, opencageKey, shodanKey) {
        console.log("[DEBUG] Fetching weather data for:", city);
        console.log("[DEBUG] API Keys - OpenWeather: " + (openweatherKey ? 'provided' : 'missing') + 
                  ", OpenCage: " + (opencageKey ? 'provided' : 'missing'));
        
        // Update loading logs with actual status
        updateLoadingLogs('Connecting to OpenCage API...');
        
        fetch('/get_weather', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                city: city,
                openweather_key: openweatherKey,
                opencage_key: opencageKey,
                shodan_key: shodanKey || ''
            })
        })
        .then(response => {
            console.log("[DEBUG] Server response status:", response.status);
            updateLoadingLogs('Server response received...');
            
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.error || `Server error: ${response.status}`);
                });
            }
            return response.json();
        })
        .then(data => {
            console.log("[DEBUG] Weather data received:", data);
            
            if (data.error) {
                console.error("[DEBUG] Error in response:", data.error);
                hideLoadingModal();
                alert('❌ Error: ' + data.error);
            } else {
                updateLoadingLogs('✓ Weather data processed successfully!');
                updateLoadingLogs('✓ Generating results page...');
                
                // Store data in session storage
                sessionStorage.setItem('weatherData', JSON.stringify(data));
                console.log("[DEBUG] Data stored in session storage");
                
                // Wait for animation to complete then redirect
                setTimeout(() => {
                    hideLoadingModal();
                    window.location.href = '/results';
                }, 3000);
            }
        })
        .catch(error => {
            console.error("[DEBUG] Fetch error:", error);
            hideLoadingModal();
            
            // Show user-friendly error message
            let errorMessage = error.message;
            if (error.message.includes('Failed to fetch')) {
                errorMessage = 'Cannot connect to server. Make sure the server is running.';
            } else if (error.message.includes('401')) {
                errorMessage = 'Invalid API key. Please check your OpenWeather or OpenCage API keys.';
            } else if (error.message.includes('404')) {
                errorMessage = 'City not found. Please check the spelling and try again.';
            }
            
            alert('❌ Error: ' + errorMessage);
        });
    }
    
    // Helper function to update loading logs
    function updateLoadingLogs(message) {
        console.log("[DEBUG] Loading log:", message);
        // You can add visual feedback here if needed
    }
    
    // ==================== RESULTS PAGE FUNCTIONALITY ====================
    if (window.location.pathname === '/results') {
        console.log("[DEBUG] Results page loaded");
        displayWeatherResults();
    }
    
    function displayWeatherResults() {
        const weatherData = sessionStorage.getItem('weatherData');
        
        if (!weatherData) {
            console.log("[DEBUG] No weather data found, redirecting to dashboard");
            alert('No weather data found. Please search for a location first.');
            window.location.href = '/dashboard';
            return;
        }
        
        try {
            const data = JSON.parse(weatherData);
            console.log("[DEBUG] Displaying weather data for:", data.city);
            
            const resultsContainer = document.getElementById('weatherResults');
            
            if (!resultsContainer) {
                console.error("[DEBUG] Results container not found");
                return;
            }
            
            const weatherIcon = getWeatherIcon(data.weather.icon);
            const windDirection = getWindDirection(data.wind.deg);
            
            // Build the HTML with proper error checking
            let html = `
                <div class="location-header">
                    <span class="country-flag">${data.flag || '🏳️'}</span>
                    <div class="location-info">
                        <h2>${data.city || 'Unknown'}, ${data.country || 'Unknown'}</h2>
                        <p><i class="fas fa-map-marker-alt"></i> ${data.coordinates?.lat || '0'}°, ${data.coordinates?.lon || '0'}°</p>
                    </div>
                </div>
                
                <div class="weather-grid">
                    <div class="weather-card">
                        <i class="fas ${weatherIcon}"></i>
                        <h3>Temperature</h3>
                        <div class="value">${data.temperature?.current || '0'}°C</div>
                        <div class="unit">Feels like ${data.temperature?.feels_like || '0'}°C</div>
                    </div>
                    
                    <div class="weather-card">
                        <i class="fas fa-wind"></i>
                        <h3>Wind</h3>
                        <div class="value">${data.wind?.speed || '0'} m/s</div>
                        <div class="unit">${windDirection}</div>
                    </div>
                    
                    <div class="weather-card">
                        <i class="fas fa-tint"></i>
                        <h3>Humidity</h3>
                        <div class="value">${data.humidity || '0'}%</div>
                    </div>
                    
                    <div class="weather-card">
                        <i class="fas fa-compress-alt"></i>
                        <h3>Pressure</h3>
                        <div class="value">${data.pressure || '0'} hPa</div>
                    </div>
                </div>
                
                <div class="temperature-details">
                    <div class="temp-item">
                        <div class="temp-label">Min Temperature</div>
                        <div class="temp-value">${data.temperature?.min || '0'}°C</div>
                    </div>
                    <div class="temp-item">
                        <div class="temp-label">Max Temperature</div>
                        <div class="temp-value">${data.temperature?.max || '0'}°C</div>
                    </div>
                </div>
            `;
            
            // Add weather description if available
            if (data.weather) {
                html += `
                    <div class="weather-description">
                        <h3>${data.weather.main || 'Unknown'}</h3>
                        <p>${data.weather.description || 'No description'}</p>
                    </div>
                `;
            }
            
            // Add additional weather info
            html += `
                <div class="weather-grid">
                    <div class="weather-card">
                        <i class="fas fa-cloud"></i>
                        <h3>Cloud Cover</h3>
                        <div class="value">${data.clouds || '0'}%</div>
                    </div>
                    
                    <div class="weather-card">
                        <i class="fas fa-eye"></i>
                        <h3>Visibility</h3>
                        <div class="value">${data.visibility || '0'} km</div>
                    </div>
                    
                    <div class="weather-card">
                        <i class="fas fa-sun"></i>
                        <h3>Sunrise</h3>
                        <div class="value">${data.sun?.rise || '00:00'}</div>
                    </div>
                    
                    <div class="weather-card">
                        <i class="fas fa-moon"></i>
                        <h3>Sunset</h3>
                        <div class="value">${data.sun?.set || '00:00'}</div>
                    </div>
                </div>
            `;
            
            resultsContainer.innerHTML = html;
            console.log("[DEBUG] Weather results displayed successfully");
            
        } catch (error) {
            console.error("[DEBUG] Error parsing weather data:", error);
            alert('Error displaying weather data. Please try again.');
            window.location.href = '/dashboard';
        }
        
        // ==================== RESULTS PAGE BUTTONS ====================
        const backBtn = document.getElementById('backToDashboard');
        if (backBtn) {
            backBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log("[DEBUG] Back to dashboard clicked");
                window.location.href = '/dashboard';
            });
        }
        
        const refreshBtn = document.getElementById('refreshData');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log("[DEBUG] Refresh clicked");
                window.location.href = '/dashboard';
            });
        }
    }
    
    // ==================== HELPER FUNCTIONS ====================
    
    // Helper function to get weather icon
    function getWeatherIcon(iconCode) {
        if (!iconCode) return 'fa-cloud-sun';
        
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
        if (degrees === undefined || degrees === null) return 'N/A';
        
        const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
        const index = Math.round(degrees / 22.5) % 16;
        return directions[index] || 'N';
    }
    
    // ==================== ADDITIONAL UTILITIES ====================
    
    // Test API key validity (optional feature)
    window.testApiKey = function(apiType, apiKey) {
        console.log("[DEBUG] Testing " + apiType + " API key");
        
        fetch('/test_api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                api_type: apiType,
                api_key: apiKey
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.valid) {
                alert('✓ ' + apiType + ' API key is valid!');
            } else {
                alert('✗ ' + apiType + ' API key is invalid. Status: ' + data.status);
            }
        })
        .catch(error => {
            alert('Error testing API key: ' + error.message);
        });
    };
    
    console.log("[DEBUG] SKY-INFONGA JavaScript fully loaded");
});
