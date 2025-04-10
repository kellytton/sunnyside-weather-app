const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
    closeApp: () => ipcRenderer.send("close-btn"),
    minimizeApp: () => ipcRenderer.send("minimize-btn"),
});