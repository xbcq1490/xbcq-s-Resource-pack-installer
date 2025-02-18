const { ipcRenderer } = require('electron');

let selectedFile = null;

document.getElementById('upload-btn').addEventListener('click', async () => {
    selectedFile = await ipcRenderer.invoke('select-zip');

    if (selectedFile) {
        document.getElementById('file-name').innerText = `Selected: ${selectedFile}`;
        document.getElementById('install-btn').disabled = false;
    }
});

document.getElementById('install-btn').addEventListener('click', async () => {
    const result = await ipcRenderer.invoke('install-zip', selectedFile);
    document.getElementById('status').innerText = result.message;
});
