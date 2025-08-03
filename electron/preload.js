const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    // Platform information (useful for conditional styling/behavior)
    platform: process.platform,

    // Simple check to confirm we're running in Electron
    isElectron: true
});