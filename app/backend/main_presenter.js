const { BrowserWindow, Menu, dialog } = require('electron');
const url = require('url');
const path = require('path');

const createMenuTemplate = require('./menu_template');

function loadView(viewName, options) {
  let window = new BrowserWindow(options);
  window.loadURL(url.format({
    pathname: path.join(__dirname, `../${viewName}.html`),
    protocol: 'file:',
    slashes: true
  }));
  window.once('ready-to-show', () => {
    window.show();
  });
  return window;
}

class MainPresenter {
  showMainWindow() {
    if (this.mainWindow)
      return this.mainWindow;

    const menu = Menu.buildFromTemplate(createMenuTemplate(this));
    Menu.setApplicationMenu(menu);

    this.mainWindow = loadView('index', { width: 1024, height: 800, show: false });
    return this.mainWindow;
  }

  showAdmin() {
    return loadView('views/admin', { parent: this.mainWindow, modal: true, show: false, title: 'Admin' });
  }

  showOpenDialog(options, callback) {
    dialog.showOpenDialog(this.mainWindow, options, callback);
  }
}

module.exports = MainPresenter;