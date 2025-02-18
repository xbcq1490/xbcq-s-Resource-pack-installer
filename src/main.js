const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 500,
        height: 550,
        resizable: false, // Disable resizing
        autoHideMenuBar: true, // Hide menu bar
        icon: path.join(__dirname, 'icon.ico'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });


    mainWindow.loadFile('index.html');
});

ipcMain.handle('select-zip', async () => {
    const result = await dialog.showOpenDialog({
        filters: [{ name: 'ZIP Files', extensions: ['zip'] }],
        properties: ['openFile']
    });

    return result.filePaths[0] || null;
});

ipcMain.handle('install-zip', async (event, filePath) => {
    if (!filePath) return { success: false, message: "No file selected" };

    const mcDir = getMinecraftResourcePackPath();
    if (!fs.existsSync(mcDir)) return { success: false, message: "Minecraft resource pack folder not found" };

    const destPath = path.join(mcDir, path.basename(filePath));

    try {
        fs.copyFileSync(filePath, destPath);
        return { success: true, message: "Installed successfully!" };
    } catch (error) {
        return { success: false, message: error.message };
    }
});

function getMinecraftResourcePackPath() {
    switch (process.platform) {
        case 'win32': return path.join(process.env.APPDATA, '.minecraft', 'resourcepacks');
        case 'darwin': return path.join(process.env.HOME, 'Library', 'Application Support', 'minecraft', 'resourcepacks');
        case 'linux': return path.join(process.env.HOME, '.minecraft', 'resourcepacks');
        default: return null;
    }
}
