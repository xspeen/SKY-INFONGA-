#!/usr/bin/env python3
"""
SKY-INFONGA - Advanced Weather Intelligence Platform
Main Application Server - FIXED VERSION
"""

import os
import requests
import json
import time
from flask import Flask, render_template, request, jsonify, session, redirect, url_for
from flask_cors import CORS
import webbrowser
import threading
import socket
import sys

# Initialize Flask app
app = Flask(__name__)
app.secret_key = os.urandom(24).hex()
CORS(app)

# API Configuration - USING HTTPS
OPENWEATHER_API_URL = "https://api.openweathermap.org/data/2.5"
OPENCAGE_API_URL = "https://api.opencagedata.com/geocode/v1/json"

# Colors for terminal banner
BLUE = '\033[94m'
CYAN = '\033[96m'
GREEN = '\033[92m'
YELLOW = '\033[93m'
RED = '\033[91m'
BOLD = '\033[1m'
RESET = '\033[0m'

def get_local_ip():
    """Get local IP address"""
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except:
        return "127.0.0.1"

def display_banner():
    """Display SKY-INFONGA banner in terminal"""
    banner = f"""
{BLUE}{BOLD}╔══════════════════════════════════════════════════════════════╗
║                                                                  ║
║   ███████╗██╗  ██╗██╗   ██╗    ██╗███╗   ██╗███████╗ ██████╗  ║
║   ██╔════╝██║ ██╔╝╚██╗ ██╔╝    ██║████╗  ██║██╔════╝██╔═══██╗ ║
║   ███████╗█████╔╝  ╚████╔╝     ██║██╔██╗ ██║█████╗  ██║   ██║ ║
║   ╚════██║██╔═██╗   ╚██╔╝      ██║██║╚██╗██║██╔══╝  ██║   ██║ ║
║   ███████║██║  ██╗   ██║       ██║██║ ╚████║██║     ╚██████╔╝ ║
║   ╚══════╝╚═╝  ╚═╝   ╚═╝       ╚═╝╚═╝  ╚═══╝╚═╝      ╚═════╝  ║
║                                                                  ║
║              ██╗███╗   ██╗███████╗ ██████╗ ███╗   ██╗           ║
║              ██║████╗  ██║██╔════╝██╔═══██╗████╗  ██║           ║
║              ██║██╔██╗ ██║█████╗  ██║   ██║██╔██╗ ██║           ║
║              ██║██║╚██╗██║██╔══╝  ██║   ██║██║╚██╗██║           ║
║              ██║██║ ╚████║██║     ╚██████╔╝██║ ╚████║           ║
║              ╚═╝╚═╝  ╚═══╝╚═╝      ╚═════╝ ╚═╝  ╚═══╝           ║
║                                                                  ║
║                  WEATHER INTELLIGENCE PLATFORM                   ║
║                         v1.0.0 - 2024                           ║
╚══════════════════════════════════════════════════════════════════╝{RESET}

{CYAN}╔══════════════════════════════════════════════════════════════════╗
║                     SYSTEM INITIALIZED                           ║
╠══════════════════════════════════════════════════════════════════╣
║  • Server: Flask Development Server                              ║
║  • Mode: Local Development                                       ║
║  • Platform: Cross-Platform Compatible                          ║
║  • Status: {GREEN}ACTIVE{RESET}{CYAN}                                                ║
╚══════════════════════════════════════════════════════════════════╝{RESET}
"""
    print(banner)

@app.route('/')
def index():
    """Splash screen with loading effect"""
    return render_template('index.html')

@app.route('/portfolio')
def portfolio():
    """Portfolio page with website information"""
    return render_template('portfolio.html')

@app.route('/dashboard')
def dashboard():
    """Main dashboard for weather queries"""
    return render_template('dashboard.html')

@app.route('/results')
def results():
    """Results page"""
    return render_template('results.html')

@app.route('/get_weather', methods=['POST'])
def get_weather():
    """Get weather data from OpenWeather API - FIXED VERSION"""
    try:
        data = request.json
        city = data.get('city')
        openweather_key = data.get('openweather_key')
        opencage_key = data.get('opencage_key')
        
        # Validate API keys
        if not openweather_key or not opencage_key:
            return jsonify({'error': 'OpenWeather and OpenCage API keys are required'}), 400
        
        if not city:
            return jsonify({'error': 'City name is required'}), 400
            
        print(f"[DEBUG] Searching for city: {city}")
        
        # First, get coordinates from OpenCage
        try:
            geo_response = requests.get(
                OPENCAGE_API_URL,
                params={
                    'q': city,
                    'key': opencage_key,
                    'limit': 1,
                    'pretty': 1,
                    'no_annotations': 1
                },
                timeout=10
            )
            
            print(f"[DEBUG] OpenCage Response Status: {geo_response.status_code}")
            
            if geo_response.status_code != 200:
                return jsonify({'error': f'OpenCage API error: Status {geo_response.status_code}'}), 400
            
            geo_data = geo_response.json()
            
            # Check if we got results
            if 'results' not in geo_data or len(geo_data['results']) == 0:
                return jsonify({'error': f'Location "{city}" not found. Please check the spelling.'}), 404
            
            location = geo_data['results'][0]
            
            # Get coordinates - handle different possible structures
            if 'geometry' in location:
                lat = location['geometry']['lat']
                lng = location['geometry']['lng']
            elif 'bounds' in location:
                # Try to get center from bounds
                bounds = location['bounds']
                lat = (bounds['northeast']['lat'] + bounds['southwest']['lat']) / 2
                lng = (bounds['northeast']['lng'] + bounds['southwest']['lng']) / 2
            else:
                return jsonify({'error': 'Could not determine coordinates for this location'}), 400
            
            print(f"[DEBUG] Coordinates: {lat}, {lng}")
            
        except requests.exceptions.Timeout:
            return jsonify({'error': 'OpenCage API request timed out. Please try again.'}), 504
        except requests.exceptions.ConnectionError:
            return jsonify({'error': 'Cannot connect to OpenCage API. Check your internet connection.'}), 503
        except Exception as e:
            print(f"[DEBUG] OpenCage error: {str(e)}")
            return jsonify({'error': f'Error with OpenCage API: {str(e)}'}), 500
        
        # Get weather data from OpenWeather
        try:
            weather_response = requests.get(
                f"{OPENWEATHER_API_URL}/weather",
                params={
                    'lat': lat,
                    'lon': lng,
                    'appid': openweather_key,
                    'units': 'metric'
                },
                timeout=10
            )
            
            print(f"[DEBUG] OpenWeather Response Status: {weather_response.status_code}")
            
            if weather_response.status_code != 200:
                error_data = weather_response.json() if weather_response.text else {}
                error_message = error_data.get('message', 'Unknown error') if isinstance(error_data, dict) else 'Unknown error'
                return jsonify({'error': f'OpenWeather API error: {error_message}'}), 400
            
            weather_data = weather_response.json()
            
        except requests.exceptions.Timeout:
            return jsonify({'error': 'OpenWeather API request timed out. Please try again.'}), 504
        except requests.exceptions.ConnectionError:
            return jsonify({'error': 'Cannot connect to OpenWeather API. Check your internet connection.'}), 503
        except Exception as e:
            print(f"[DEBUG] OpenWeather error: {str(e)}")
            return jsonify({'error': f'Error with OpenWeather API: {str(e)}'}), 500
        
        # Get country info
        country_code = weather_data['sys']['country']
        
        # Get country name from components if available
        components = location.get('components', {})
        country_name = components.get('country', 'Unknown')
        
        # Get flag emoji from country code
        try:
            flag_offset = ord(country_code[0]) - ord('A')
            flag = chr(0x1F1E6 + flag_offset) + chr(0x1F1E6 + flag_offset + (ord(country_code[1]) - ord('A')))
        except:
            flag = '🏳️'  # Default white flag if error
        
        # Get city name from weather data or components
        city_name = weather_data.get('name', city)
        if city_name == '' or city_name == 'Global':
            city_name = components.get('city', components.get('town', components.get('village', city)))
        
        # Prepare comprehensive weather info
        weather_info = {
            'city': city_name,
            'country': country_name,
            'country_code': country_code,
            'flag': flag,
            'coordinates': {
                'lat': round(lat, 4),
                'lon': round(lng, 4)
            },
            'temperature': {
                'current': round(weather_data['main']['temp']),
                'feels_like': round(weather_data['main']['feels_like']),
                'min': round(weather_data['main']['temp_min']),
                'max': round(weather_data['main']['temp_max'])
            },
            'humidity': weather_data['main']['humidity'],
            'pressure': weather_data['main']['pressure'],
            'wind': {
                'speed': round(weather_data['wind']['speed'], 1),
                'deg': weather_data['wind'].get('deg', 0)
            },
            'weather': {
                'main': weather_data['weather'][0]['main'],
                'description': weather_data['weather'][0]['description'],
                'icon': weather_data['weather'][0]['icon']
            },
            'clouds': weather_data['clouds']['all'],
            'visibility': round(weather_data.get('visibility', 10000) / 1000, 1),  # Convert to km
            'sun': {
                'rise': time.strftime('%H:%M', time.localtime(weather_data['sys']['sunrise'])),
                'set': time.strftime('%H:%M', time.localtime(weather_data['sys']['sunset']))
            }
        }
        
        print(f"[DEBUG] Weather data retrieved successfully for {city_name}")
        return jsonify(weather_info)
        
    except Exception as e:
        print(f"[DEBUG] Unexpected error: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': f'Unexpected error: {str(e)}'}), 500

@app.route('/test_api', methods=['POST'])
def test_api():
    """Test API keys before full request"""
    try:
        data = request.json
        api_type = data.get('api_type')
        api_key = data.get('api_key')
        
        if api_type == 'opencage':
            response = requests.get(
                OPENCAGE_API_URL,
                params={
                    'q': 'London',
                    'key': api_key,
                    'limit': 1
                },
                timeout=5
            )
            return jsonify({
                'valid': response.status_code == 200,
                'status': response.status_code
            })
            
        elif api_type == 'openweather':
            response = requests.get(
                f"{OPENWEATHER_API_URL}/weather",
                params={
                    'q': 'London',
                    'appid': api_key,
                    'units': 'metric'
                },
                timeout=5
            )
            return jsonify({
                'valid': response.status_code == 200,
                'status': response.status_code
            })
            
        else:
            return jsonify({'error': 'Invalid API type'}), 400
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def open_browser(port):
    """Open browser after server starts"""
    time.sleep(2)  # Wait for server to start
    try:
        webbrowser.open(f"http://localhost:{port}")
    except:
        print(f"{YELLOW}Could not open browser automatically. Please navigate to http://localhost:{port}{RESET}")

if __name__ == '__main__':
    # Display banner
    display_banner()
    
    # Get port from environment or use default
    port = int(os.environ.get('PORT', 5000))
    
    # Print access information
    local_ip = get_local_ip()
    print(f"\n{GREEN}{BOLD}╔══════════════════════════════════════════════════════════════╗")
    print(f"║                    SERVER ACCESS INFORMATION                ║")
    print(f"╠══════════════════════════════════════════════════════════════╣")
    print(f"║  • Local:    http://localhost:{port}                              ║")
    print(f"║  • Network:  http://{local_ip}:{port}                        ║")
    print(f"║  • Terminal: {CYAN}Press CTRL+C to stop server{RESET}{GREEN}                    ║")
    print(f"╚══════════════════════════════════════════════════════════════╝{RESET}\n")
    
    print(f"{YELLOW}Starting SKY-INFONGA server...{RESET}")
    print(f"{YELLOW}Make sure you have valid API keys from:{RESET}")
    print(f"{YELLOW}  • OpenWeather: https://openweathermap.org/api{RESET}")
    print(f"{YELLOW}  • OpenCage: https://opencagedata.com/{RESET}\n")
    
    # Open browser automatically in a thread
    threading.Thread(target=open_browser, args=(port,), daemon=True).start()
    
    # Run the app
    try:
        app.run(host='0.0.0.0', port=port, debug=True, threaded=True)
    except KeyboardInterrupt:
        print(f"\n{YELLOW}Shutting down SKY-INFONGA server...{RESET}")
        sys.exit(0)
    except Exception as e:
        print(f"{RED}Error starting server: {e}{RESET}")
        sys.exit(1)
