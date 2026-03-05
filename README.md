```markdown
<div align="center">
  
# 🌤️ SKY-INFONGA

### *Advanced Weather Intelligence Platform*

[![Python](https://img.shields.io/badge/Python-3.7+-blue.svg)](https://python.org)
[![Flask](https://img.shields.io/badge/Flask-3.0+-green.svg)](https://flask.palletsprojects.com)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

<img src="https://iili.io/qnH95mv.jpg" alt="SKY-INFONGA Logo" width="200"/>

</div>

---

## 📖 Overview

SKY-INFONGA is a comprehensive weather intelligence platform that provides real-time weather data for any location worldwide. Built with Flask and modern web technologies, it offers a beautiful, responsive interface accessible from any device.

## ✨ Key Features

<div align="center">

| 🌡️ | 💨 | 🗺️ | 🎨 | 📱 | 💻 |
|:---:|:---:|:---:|:---:|:---:|:---:|
| **Real-time Data** | **Wind Speed** | **Geolocation** | **Beautiful UI** | **Mobile Ready** | **Cross-Platform** |
| Temperature, Humidity | & Direction | Auto Country Detection | Smooth Animations | Responsive Design | Termux, Kali, Windows, macOS |

</div>

## 🚀 Quick Start Guide

### Prerequisites
- Python 3.7 or higher
- pip (Python package manager)

### Installation Steps

```bash
# 1. Clone the repository
git clone https://github.com/xspeen/SKY-INFONGA-.git
cd SKY-INFONGA-/

# 2. Install dependencies
pip install -r requirements.txt

# 3. Run the application
python app.py
```

1. Access the application
      Open your browser and navigate to http://localhost:5000

🔑 API Configuration

You'll need to obtain API keys from the following services:

Service Purpose Status Link
OpenWeather Weather Data Required Get API Key
OpenCage Geocoding Required Get API Key
Shodan Network Intelligence Optional Get API Key

📱 Platform-Specific Setup

<details>
<summary><b>📱 Termux (Android)</b></summary>

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
<summary><b>🐉 Kali Linux</b></summary>

```bash
sudo apt update
sudo apt install python3 python3-pip git
git clone https://github.com/xspeen/SKY-INFONGA-.git
cd SKY-INFONGA-/
pip3 install -r requirements.txt
python3 app.py
```

</details>

🎯 Usage Guide

1. Splash Screen → Application loads with animated logo
2. Portfolio Page → Overview of features and documentation
3. Dashboard → Enter location and API keys
4. Results → View comprehensive weather data

🛠️ Technology Stack

<div align="center">

Backend Frontend APIs Styling Icons
Flask (Python) HTML5, CSS3, JavaScript OpenWeather, OpenCage, Shodan Custom CSS with Variables Font Awesome 6

</div>

📁 Project Structure

```
SKY-INFONGA/
├── 📄 app.py              # Main Flask application
├── 📄 requirements.txt    # Python dependencies
├── 📄 README.md          # Documentation
├── 📁 static/
│   ├── 📁 css/
│   │   └── 🎨 style.css  # Main stylesheet
│   └── 📁 js/
│       └── ⚙️ main.js    # Frontend JavaScript
└── 📁 templates/
    ├── 📄 index.html     # Splash screen
    ├── 📄 portfolio.html # Portfolio page
    ├── 📄 dashboard.html # Main dashboard
    └── 📄 results.html   # Weather results
```

⚙️ Configuration

The application runs on port 5000 by default. You can change this by setting the PORT environment variable:

```bash
export PORT=8080
python app.py
```

🔒 Security Best Practices

· ✅ API keys are handled client-side and not stored
· ✅ Session storage is used for temporary data
· ✅ HTTPS recommended for production deployment
· ✅ Never commit API keys to version control

🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments

· 🌤️ OpenWeather for weather data
· 🗺️ OpenCage for geocoding services
· 🎨 Font Awesome for icons
· 🔥 Flask community for the framework

📞 Support & Contact

<div align="center">

https://img.shields.io/badge/Report%20Issue-Open%20in%20GitHub-red
https://img.shields.io/badge/Contact-Developer-blue

---

Made with ❤️ by XSPEEN Team

⬆ Back to Top

</div>
```
