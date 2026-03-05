#!/usr/bin/env python3
"""
SKY-INFONGA - Advanced Weather Intelligence Platform
Main Application Server
"""

import os
import requests
import json
import time
from flask import Flask, render_template, request, jsonify, session, redirect, url_for
from flask_cors import CORS
from dotenv import load_dotenv
import webbrowser
import threading
import socket
import sys

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
app.secret_key = os.urandom(24).hex()
CORS(app)

# API Configuration
OPENWEATHER_API_URL = "http://api.openweathermap.org/data/2.5"
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

{CYAN}╔══════════════════════════════════════════════════════════════╗
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

@app.route('/get_weather', methods=['POST'])
def get_weather():
    """Get weather data from OpenWeather API"""
    try:
        data = request.json
        city = data.get('city')
        openweather_key = data.get('openweather_key')
        shodan_key = data.get('shodan_key')
        opencage_key = data.get('opencage_key')
        
        # Validate API keys
        if not all([openweather_key, opencage_key]):
            return jsonify({'error': 'OpenWeather and OpenCage API keys are required'}), 400
        
        # First, get coordinates from OpenCage
        geo_response = requests.get(
            OPENCAGE_API_URL,
            params={
                'q': city,
                'key': opencage_key,
                'limit': 1
            }
        )
        
        if geo_response.status_code != 200:
            return jsonify({'error': 'Failed to geocode location'}), 400
        
        geo_data = geo_response.json()
        if not geo_data['results']:
            return jsonify({'error': 'Location not found'}), 404
        
        location = geo_data['results'][0]
        lat = location['geometry']['lat']
        lon = location['geometry']['lng']
        
        # Get weather data from OpenWeather
        weather_response = requests.get(
            f"{OPENWEATHER_API_URL}/weather",
            params={
                'lat': lat,
                'lon': lon,
                'appid': openweather_key,
                'units': 'metric'
            }
        )
        
        if weather_response.status_code != 200:
            return jsonify({'error': 'Failed to fetch weather data'}), 400
        
        weather_data = weather_response.json()
        
        # Get country info
        country_code = weather_data['sys']['country']
        country_name = location['components'].get('country', 'Unknown')
        
        # Get flag emoji from country code
        flag_offset = ord(country_code[0]) - ord('A')
        flag = chr(0x1F1E6 + flag_offset) + chr(0x1F1E6 + flag_offset + (ord(country_code[1]) - ord('A')))
        
        # Prepare comprehensive weather info
        weather_info = {
            'city': weather_data['name'],
            'country': country_name,
            'country_code': country_code,
            'flag': flag,
            'coordinates': {
                'lat': lat,
                'lon': lon
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
                'speed': weather_data['wind']['speed'],
                'deg': weather_data['wind'].get('deg', 0)
            },
            'weather': {
                'main': weather_data['weather'][0]['main'],
                'description': weather_data['weather'][0]['description'],
                'icon': weather_data['weather'][0]['icon']
            },
            'clouds': weather_data['clouds']['all'],
            'visibility': weather_data.get('visibility', 0) / 1000,  # Convert to km
            'sun': {
                'rise': time.strftime('%H:%M', time.localtime(weather_data['sys']['sunrise'])),
                'set': time.strftime('%H:%M', time.localtime(weather_data['sys']['sunset']))
            },
            'timezone': weather_data['timezone']
        }
        
        return jsonify(weather_info)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/get_country_info', methods=['POST'])
def get_country_info():
    """Get additional country information"""
    try:
        data = request.json
        country = data.get('country')
        opencage_key = data.get('opencage_key')
        
        # You can add more country info here
        # For now, return basic info
        return jsonify({'status': 'success'})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def open_browser(port):
    """Open browser after server starts"""
    time.sleep(2)  # Wait for server to start
    webbrowser.open(f"http://localhost:{port}")

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
    
    # Open browser automatically
    threading.Thread(target=open_browser, args=(port,)).start()
    
    # Run the app
    app.run(host='0.0.0.0', port=port, debug=True, threaded=True)
