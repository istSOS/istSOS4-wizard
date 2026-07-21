const { app, BrowserWindow, Menu, shell, ipcMain, dialog, Notification } = require('electron');
const path = require('path');
const isDev = !app.isPackaged;

let mainWindow;

// Handle Linux-specific sandbox issues
if (process.platform === 'linux') {
    app.commandLine.appendSwitch('--no-sandbox');
    app.commandLine.appendSwitch('--disable-dev-shm-usage');
    app.commandLine.appendSwitch('--disable-gpu-sandbox');
}

function createWindow() {

    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: false,
            webSecurity: true
        },
        icon: path.join(__dirname, '../public/logo.png'),
        title: 'istSOS4 Configurator',
        show: false,
    });

    // Load the app
    if (isDev) {
        mainWindow.loadURL('http://localhost:5173');

    } else {
        mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    }

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();

        // Focus on the window
        if (isDev) {
            mainWindow.focus();
        }
    });

    // Handle window closed
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // Handle external links
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });
}

app.whenReady().then(() => {
    createWindow();

    Menu.setApplicationMenu(null);

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Security: Prevent new window creation
app.on('web-contents-created', (event, contents) => {
    contents.on('new-window', (event, navigationUrl) => {
        event.preventDefault();
        shell.openExternal(navigationUrl);
    });
});
