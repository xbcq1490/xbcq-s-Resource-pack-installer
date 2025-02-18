const { MSICreator } = require('electron-wix-msi');
const path = require('path');


const APP_DIR = path.resolve(__dirname, './xbcqRPInstaller-win32-x64');

const OUT_DIR = path.resolve(__dirname, './windows_installer');

const msiCreator = new MSICreator({
    appDirectory: APP_DIR,
    outputDirectory: OUT_DIR,

    description: 'Installer for xbcq\'s Resource pack',
    exe: 'xbcqRPInstaller',
    name: 'xbcq\'s Resource pack installer',
    manufacturer: 'xbcq',
    version: '1.0.0',
    shortcutName: 'xbcq\'s Resource pack installer',
    programFilesFolderName:'xbcq_rpi',
    ui: {
        chooseDirectory: true
    },
});

msiCreator.create().then(function(){
    msiCreator.compile();
});