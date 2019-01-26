const { app, BrowserWindow, ipcMain } = require('electron')
const fs = require("fs")

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
let workerWindow

function createWindow () {
  // Create the browser window.
  
  workerWindow = new BrowserWindow();
  workerWindow.loadFile("dist/PharmacyManagementSystem/assets/html/worker.html");
  //workerWindow.hide();
  workerWindow.on('closed', () => {
    workerWindow = null
  })
  
  win = new BrowserWindow({ width: 800, height: 600 })
  
  // and load the index.html of the app.
  win.loadFile('dist/PharmacyManagementSystem/index.html')

  // Open the DevTools.
  //win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
    app.quit();
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

ipcMain.on('print', (event, content)=>{
  console.log('ewere', event);
  workerWindow.webContents.send('print', content);
  //windowprint = BrowserWindow.fromId(event.sender.webContents.id);
  //windowprint.webContents.print({silent:true, printBackground:true});
  //windowprint.webContents.send('print', content);
})

ipcMain.on('readyToPrint', (event)=>{
  /* workerWindow.webContents.print({silent:true, printBackground: true}); */
  workerWindow.webContents.printToPDF({
    marginsType: 0,
    printBackground: true
  }, (error, data)=>{
    if(error) throw error
    fs.writeFile(__dirname + '/print.pdf', data, (error)=>{
      if(error) throw error
      console.log('write pdf successfull')
    })
  })
})
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.