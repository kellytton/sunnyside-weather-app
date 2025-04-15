const path = require("path");
const { app, BrowserWindow, ipcMain } = require("electron");

const isDev = process.env.IS_DEV == "true" ? true : false;

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        autoHideMenuBar: true, // Adjust this to true to hide the top menu (autoHideMenuBar)
        resizable: false,
        frame: true, // Disable the default window frame later
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true,
            contextIsolation: true, // Enable context isolation for security
        },
    });

    console.log(path.join(__dirname, "../dist/index.html")); // Log the path for debugging
    mainWindow.loadURL(
        isDev
            ? "http://localhost:5174"
            : `file://${path.resolve(__dirname, "../dist/index.html")}`
    );

    // Handle Minimize
    ipcMain.on("minimize-btn", () => {
        mainWindow.minimize();
    });

    // Handle Close
    ipcMain.on("close-btn", () => {
        app.quit();
    });
}

app.whenReady().then(() => {
    console.log("Electron app is ready!");
    createWindow();

    app.on("activate", function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
