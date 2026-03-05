# SKY-INFONGA 🌤️

Advanced Weather Intelligence Platform

![SKY-INFONGA Logo](https://iili.io/qnH95mv.jpg)

## 📋 Description

SKY-INFONGA is a comprehensive weather intelligence platform that provides real-time weather data for any location worldwide. Built with Flask and modern web technologies, it offers a beautiful, responsive interface accessible from any device.

## ✨ Features

- **Real-time Weather Data**: Current temperature, humidity, wind speed, and more
- **Geolocation**: Automatic country detection and flag display
- **Beautiful UI**: Smooth animations and transitions
- **Dark/Light Mode**: Toggle between themes
- **Mobile Responsive**: Works on all devices
- **Cross-Platform**: Runs on Termux, Kali Linux, Windows, macOS

## 🚀 Installation

### Prerequisites
- Python 3.7 or higher
- pip (Python package manager)

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/xspeen/SKY-INFONGA-.git
cd SKY-INFONGA
```

1. Install dependencies

```bash
pip install -r requirements.txt
```

1. Run the application

```bash
python app.py
```

1. Access the application

· Open your browser and navigate to http://localhost:5000

🔑 API Keys Required

You'll need to obtain API keys from the following services:

OpenWeather API (Required)

· Sign up at OpenWeather
· Get your API key from the dashboard

OpenCage API (Required)

· Register at OpenCage
· Obtain your API key

Shodan API (Optional)

· Get API key from Shodan
· Provides additional network intelligence

📱 Mobile Usage

On Termux (Android)

```bash
pkg update && pkg upgrade
pkg install python git
git clone https://github.com/xspeen/SKY-INFONGA-.git
cd SKY-INFONGA-/
pip install -r requirements.txt
python app.py
```

On Kali Linux

```bash
sudo apt update
sudo apt install python3 python3-pip git
git clone https://github.com/xspeen/SKY-INFONGA-.git
cd SKY-INFONGA-/
pip3 install -r requirements.txt
python3 app.py
```

🎯 Usage Guide

1. Splash Screen: Application loads with animated logo
2. Portfolio Page: Overview of features and documentation
3. Dashboard: Enter location and API keys
4. Results: View comprehensive weather data

🛠️ Technology Stack

· Backend: Flask (Python)
· Frontend: HTML5, CSS3, JavaScript
· APIs: OpenWeather, OpenCage, Shodan
· Styling: Custom CSS with CSS Variables
· Icons: Font Awesome 6

📁 Project Structure

```
SKY-INFONGA/
├── app.py              # Main Flask application
├── requirements.txt    # Python dependencies
├── README.md          # Documentation
├── static/
│   ├── css/
│   │   └── style.css  # Main stylesheet
│   └── js/
│       └── main.js    # Frontend JavaScript
└── templates/
    ├── index.html     # Splash screen
    ├── portfolio.html # Portfolio page
    ├── dashboard.html # Main dashboard
    └── results.html   # Weather results
```

⚙️ Configuration

The application runs on port 5000 by default. You can change this by setting the PORT environment variable:

```bash
export PORT=8080
python app.py
```

🔒 Security Notes

· API keys are handled client-side and not stored
· Session storage is used for temporary data
· HTTPS recommended for production deployment

🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

📄 License

This project is licensed under the MIT License.

🙏 Acknowledgments

· OpenWeather for weather data
· OpenCage for geocoding services
· Font Awesome for icons
· Flask community for the framework

📞 Support

For issues or questions:

· Open an issue on GitHub
· Contact: your-email@example.com

---

Made with ❤️ by XSPEEN Team

```
