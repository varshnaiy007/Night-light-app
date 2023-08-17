const { app, BrowserWindow, ipcMain } = require('electron');
const settings = require('electron-settings');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadFile('index.html');

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', () => {
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

// Listen for color temperature changes from UI
ipcMain.on('change-color-temperature', (event, newTemperature) => {
    settings.set('colorTemperature', newTemperature);
    if (mainWindow) {
        mainWindow.webContents.send('color-temperature-change', newTemperature);
    }
});
