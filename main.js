const { app, BrowserView, BrowserWindow, Menu } = require('electron');
const path = require('path');
const { ipcMain } = require('electron');

const win_name = [
    'banana', 'orange', 'apple'
];

ipcMain.handle('hello', (event, arg) => {
    let ws = BrowserWindow.getAllWindows();
    for (let n in ws) {
        let w = ws[n];
        if (w.id != arg) {
            w.close();
        }
    }
    return 'only open id= ' + arg;
})

function createWindow () {
    win = new BrowserWindow({
        width: 400,
        height: 300,
        webPreferences: {
            enableRemoteModule: true,
            preload: path.join(app.getAppPath(), 'preload.js')
        }
    });
    win.loadFile('index.html');
    return win.id;
}

function createMenu() {
    let menu_temp = [
        {
            label: 'File',
            submenu: [
                { label: 'New', click: ()=> {
                    console.log('Create Menu');
                    createWindow();
                }},
                { type: 'separator' },
                { label: 'Quit', click: ()=> {
                    console.log('Quit Menu');
                    app.quit();
                }}
            ]
        }
    ];
    let menu = Menu.buildFromTemplate(menu_temp);
    Menu.setApplicationMenu(menu);
}

createMenu();
app.whenReady().then(createWindow);

// app.whenReady().then(() => {
//     createWindow()

//     // macOS
//     app.on('activate', function () {
//         if (BrowserWindow.getAllWindows().length === 0) createWindow()
//     })
// })

// // Win & Linux
// app.on('window-all-closed', function () {
//     if (process.platform !== 'darwin') app.quit
// })

// window.addEventListener('DOMContentLoad', () => {
//     const replaceText = (selector, text) => {
//         if (element) element.innerText = text
//     }

//     for (const dependency of ['chrome', 'node', 'electron']) {
//         replaceText(`${dependency}--version`, process.versions[dependency])
//     }
// })
