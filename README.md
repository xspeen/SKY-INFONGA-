# 🌤️ SKY-INFONGA
### *Advanced Weather Intelligence Platform*

![Python](https://img.shields.io/badge/Python-3.7+-blue.svg)
![Flask](https://img.shields.io/badge/Flask-3.0+-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

<div align="center">
  <img src="https://iili.io/qnH95mv.jpg" alt="SKY-INFONGA Logo" width="600"/>
  <p><em>Real-time Weather Intelligence at Your Fingertips</em></p>
</div>

---

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 📖 Overview

**SKY-INFONGA** is a cutting-edge weather intelligence platform that delivers real-time meteorological data for any location worldwide. Built with Flask and modern web technologies, it combines powerful backend processing with an elegant, responsive frontend interface accessible from any device.

Whether you're a weather enthusiast, traveler, or professional requiring accurate weather intelligence, SKY-INFONGA provides comprehensive atmospheric data including temperature, humidity, wind patterns, and more - all presented in a beautiful, intuitive dashboard.

---

## ✨ Features

<div align="center">

| Category | Features |
|:--------:|----------|
| **🌡️ Weather Data** | Real-time temperature, humidity, pressure, visibility |
| **💨 Wind Analysis** | Wind speed, direction, gusts, wind chill |
| **🌍 Geolocation** | Automatic country detection, flag display, timezone |
| **🎨 User Interface** | Dark/Light mode toggle, smooth animations, responsive design |
| **📱 Cross-Platform** | Works on Termux, Kali Linux, Windows, macOS |
| **🔒 Security** | Client-side API key handling, no data storage |

</div>

### Detailed Capabilities

- **Current Conditions**: Temperature (Celsius/Fahrenheit), feels like, humidity levels
- **Atmospheric Data**: Pressure, visibility distance, cloud coverage
- **Wind Metrics**: Speed, direction (cardinal & degrees), gust speed
- **Location Intelligence**: City, country, coordinates, local time
- **Visual Indicators**: Country flags, weather icons, color-coded metrics
- **Theme Support**: Seamless dark/light mode switching

---

## 🎯 Demo

<div align="center">
  
| Splash Screen | Dashboard | Results Page |
|:-------------:|:---------:|:------------:|
| Animated logo & loading | Location & API input | Weather display |
  
</div>

---

## 🚀 Installation

### Prerequisites

Ensure you have the following installed:
- **Python** (version 3.7 or higher)
- **pip** (Python package manager)
- **Git** (for cloning the repository)

### Step-by-Step Guide

#### 1. Clone the Repository
```bash
git clone https://github.com/xspeen/SKY-INFONGA-.git
cd SKY-INFONGA-/
```

2. Create Virtual Environment (Recommended)

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

3. Install Dependencies

```bash
pip install -r requirements.txt
```

4. Run the Application

```bash
python app.py
```

5. Access the Application

Open your browser and navigate to: http://localhost:5000

---

🔧 Configuration

Environment Variables

Create a .env file in the root directory (optional):

```env
PORT=5000
FLASK_ENV=development
SECRET_KEY=your-secret-key-here
```

API Keys Required

API Service Purpose Obtainment Link
OpenWeather Weather data Get API Key
OpenCage Geocoding services Get API Key
Shodan Network intelligence (optional) Get API Key

---

📱 Platform-Specific Setup

<details>
<summary><b>Android (Termux)</b></summary>

```bash
pkg update && pkg upgrade
pkg install python git
git clone https://github.com/xspeen/SKY-INFONGA-.git
cd SKY-INFONGA-/
pip install -r requirements.txt
python app.py
```

</details>

<details>
<summary><b>Kali Linux</b></summary>

```bash
sudo apt update
sudo apt install python3 python3-pip git
git clone https://github.com/xspeen/SKY-INFONGA-.git
cd SKY-INFONGA-/
pip3 install -r requirements.txt
python3 app.py
```

</details>

<details>
<summary><b>Windows</b></summary>

```bash
# Download Python from python.org
git clone https://github.com/xspeen/SKY-INFONGA-.git
cd SKY-INFONGA-/
pip install -r requirements.txt
python app.py
```

</details>

<details>
<summary><b>macOS</b></summary>

```bash
# Install Homebrew first if not available
brew install python git
git clone https://github.com/xspeen/SKY-INFONGA-.git
cd SKY-INFONGA-/
pip3 install -r requirements.txt
python3 app.py
```

</details>

---

🎮 Usage Guide

Step 1: Splash Screen

· Application loads with animated SKY-INFONGA logo
· Automatic transition to portfolio page

Step 2: Portfolio Page

· Overview of platform features
· Documentation access
· Quick links to dashboard

Step 3: Dashboard

· Enter location (city name or coordinates)
· Input your API keys
· Select units preference
· Click "Get Weather"

Step 4: Results Page

· View comprehensive weather data
· Toggle between dark/light themes
· Export or share weather information
· Search for new location

---

🛠️ Technology Stack

<div align="center">

Layer Technology
Backend Flask (Python 3.7+)
Frontend HTML5, CSS3, JavaScript (ES6)
Styling Custom CSS with CSS Variables
Icons Font Awesome 6
APIs RESTful integrations
Templating Jinja2

</div>

Detailed Dependencies

```txt
Flask==3.0.0
requests==2.31.0
python-dotenv==1.0.0
gunicorn==21.2.0 (for production)
```

---

📁 Project Structure

```
SKY-INFONGA/
│
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── README.md             # Documentation
├── .gitignore            # Git ignore file
├── .env                  # Environment variables (create this)
│
├── static/
│   ├── css/
│   │   └── style.css    # Main stylesheet with dark/light themes
│   └── js/
│       └── main.js      # Frontend JavaScript logic
│
└── templates/
    ├── index.html        # Splash screen with animation
    ├── portfolio.html    # Features and documentation
    ├── dashboard.html    # Main input interface
    └── results.html      # Weather data display
```

---

📊 API Reference

OpenWeather API Endpoints Used

```javascript
// Current Weather Data
https://api.openweathermap.org/data/2.5/weather?q={city}&appid={key}&units=metric

// Response includes:
- Temperature (current, feels like, min, max)
- Humidity percentage
- Pressure (hPa)
- Wind speed and direction
- Cloud coverage
- Visibility
- Weather conditions with icons
```

OpenCage Geocoding API

```javascript
// Forward Geocoding
https://api.opencagedata.com/geocode/v1/json?q={city}&key={key}

// Provides:
- Precise coordinates
- Country information
- Timezone data
- Formatted address
```

---

🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

Contribution Process

1. Fork the repository
2. Create your feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

Development Guidelines

· Write clear, commented code
· Update documentation for new features
· Ensure cross-browser compatibility
· Test on multiple devices
· Follow existing code style

---

📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

```
MIT License

Copyright (c) 2024 XSPEEN Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files...
```

---

👥 Team

<div align="center">

Role Name
Lead Developer XSPEEN Team
UI/UX Designer XSPEEN Team
Documentation XSPEEN Team

</div>

---

📞 Contact & Support

<div align="center">

https://img.shields.io/badge/Report%20Issue-Open%20in%20GitHub-red?style=for-the-badge&logo=github
https://img.shields.io/badge/Email-Contact%20Us-blue?style=for-the-badge&logo=gmail
https://img.shields.io/badge/Twitter-Follow%20Us-1DA1F2?style=for-the-badge&logo=twitter

</div>

---

🙏 Acknowledgments

· OpenWeather for providing comprehensive weather data
· OpenCage for accurate geocoding services
· Font Awesome for beautiful icons
· Flask Community for the excellent framework
· All Contributors who help improve this project

---

<div align="center">

⭐ Star this repository if you find it useful!

View Demo • Report Bug • Request Feature

---

Made with ❤️ by XSPEEN Team | Copyright © 2024

⬆ Back to Top

</div>
