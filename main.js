const { app } = require('electron');
const backend = require('./app/backend/app');
const Settings = require('./app/backend/settings');
const logger = require('./app/backend/logger');
const MainPresenter = require('./app/backend/main_presenter');

const mainPresenter = new MainPresenter();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
  new Settings(app).load().then((settings) => {
    global.settings = settings;
    global.backend = backend;
    global.backend.initialize(settings);
    global.mainPresenter = mainPresenter;

    win = mainPresenter.showMainWindow();

    // Emitted when the window is closed.
    win.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      win = null;
    });
  }).catch((err) => {
    logger.error(err);
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
