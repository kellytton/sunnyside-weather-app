const path = require("path");
const { app, BrowserWindow, ipcMain } = require("electron");

const isDev = process.env.IS_DEV == "true" ? true : false;

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 713,
        height: 663,
        autoHideMenuBar: true, // Adjust this to true to hide the top menu (autoHideMenuBar)
        resizable: false,
        frame: false, // Disables the default window frame
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: false, // Disable node integration for security reasons
            contextIsolation: true, // Enable context isolation for security
        },
    });

    console.log(path.join(__dirname, "../dist/index.html")); // Log the path for debugging
    mainWindow.loadURL(
        isDev
            ? "http://localhost:5173"
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
