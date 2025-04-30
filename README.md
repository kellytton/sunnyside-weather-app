# 🌤️ SunnySide

SunnySide is a cozy, food-themed desktop weather app that serves up more than just forecasts—it delivers meal vibes to match the mood. Whether it’s BBQ weather or stew season, SunnySide serves up the perfect dish for the day.

> ☀️ **“Good weather, good mood, good food.”**

---

## 🍴 Features

- 🍔 **Meal-Weather Matching** – Craving comfort food? SunnySide suggests dishes based on the day’s weather.
- 📍 **Local Forecasts** – Real-time weather data using [Open-Meteo](https://open-meteo.com/).
- 📦 **Cross-Platform** – Working towards running smoothly on macOS and Windows via [Electron](https://www.electronjs.org/).
- 🌐 **Geolocation Support** – Get forecasts based on your saved locations.
- 🎨 **Responsive UI** – Built with [React.js](https://reactjs.org/) and [Material UI (MUI)](https://mui.com/).

---

## 🛠️ Tech Stack

| **Tool**        | **Purpose**                            |
|-----------------|----------------------------------------|
| Electron        | Cross-platform desktop shell                          |
| React           | Frontend user interface                          |
| Node.js         | Backend runtime for API logic and local server  |
| SQLite          | Local database for saved locations and preferences    |
| Vite            | Build tool and fast dev server              |
| Material UI (MUI)| Styled, responsive components                   |
| Open-Meteo     | Weather API provider             |
| Express        | Lightweight server for API handling |

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
This will launch the desktop app in development mode.

---

This desktop app is still in development!