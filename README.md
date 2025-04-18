# 🌤️ SunnySide

SunnySide is a cozy, food-themed desktop weather app that brings you more than just forecasts—it delivers meal vibes to match the mood. Whether it’s BBQ weather or stew season, SunnySide serves up the perfect dish for the day.

- [Electron](https://www.electronjs.org/) – for cross-platform desktop support
- [React.js](https://reactjs.org/) – for the frontend UI
- [Vite](https://vitejs.dev/) – for fast bundling and dev experience
- [Material UI (MUI)](https://mui.com/) - for styled, responsive components
- [Open-Meteo](https://open-meteo.com/) - for accurate weather data

This project is currently in active development!

---

## 🛠️ Tech Stack

| **Tool**        | **Purpose**                            |
|-----------------|----------------------------------------|
| Electron        | Cross-platform desktop shell                          |
| React           | UI framework                           |
| Node.js         | Backend runtime for API logic and local server  |
| SQLite          | Local database for saved locations and preferences    |
| Vite            | Build tool and fast dev server              |
| Material UI (MUI)| UI component library                   |
| Open-Meteo     | Fetch weather data             |
| Express        | API server for geocoding and weather requests |

---

## 📦 Getting Started

1. **Clone the repo**

```bash
git clone https://github.com/kellytton/sunnyside-weather-app.git
cd sunnyside-weather-app
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the backend server**

In a separate terminal window/tab, run:
```bash
cd backend
node server.js
```
This will launch the Express server that handles geocoding and weather API calls.

4. **Run the app**

Back in the root project folder, start the Electron + React app:
```bash
npm run electron:dev
```
This will launch the desktop app in developoment mode.