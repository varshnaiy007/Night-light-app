const electron = require('electron');
const settings = require('electron-settings');

const { ipcRenderer } = electron;

// Get the color temperature setting from storage
const colorTemperature = settings.get('colorTemperature') || 6500; // Default to 6500K

// Function to apply color temperature filter
function applyColorTemperature() {
    document.body.style.filter = `sepia(100%) hue-rotate(${colorTemperature - 6500}deg)`;
}

// Apply initial color temperature
applyColorTemperature();

// Listen for color temperature changes from main process
ipcRenderer.on('color-temperature-change', (event, newTemperature) => {
    colorTemperature = newTemperature;
    applyColorTemperature();
});
