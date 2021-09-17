const { app, BrowserWindow } = require('electron')

const html = '<html><head>'
    + '<title>HTML</title>'
    + '</head><body>'
    + '<h1>HTML</h1>'
    + '<p>This is string content</p>'
    + '</body></html>';

function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    });
    win.loadFile('index.html');

    let child1 = new BrowserWindow({
        width: 350,
        height: 200,
        parent: win,
        frame: false,
        transparent: true
    });
    child1.loadURL('modal.html')

    let child2 = new BrowserWindow({
        width: 350,
        height: 200,
        parent: win,
        opacity: 0.5
    });
    child2.loadURL('modal.html')
}

app.whenReady().then(() => {
    createWindow()

    // macOS
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Win & Linux
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit
})

// window.addEventListener('DOMContentLoad', () => {
//     const replaceText = (selector, text) => {
//         if (element) element.innerText = text
//     }

//     for (const dependency of ['chrome', 'node', 'electron']) {
//         replaceText(`${dependency}--version`, process.versions[dependency])
//     }
// })
