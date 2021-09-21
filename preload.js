const { remote } = require('electron');
const { ipcRenderer } = require('electron');

window.remote = remote;
window.ipcRenderer = ipcRenderer;