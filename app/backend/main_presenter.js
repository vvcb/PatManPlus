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

    this.mainWindow = loadView('views/index', { width: 1024, height: 800, show: false });
    return this.mainWindow;
  }

  showAdmin() {
    return loadView('views/admin', { parent: this.mainWindow, modal: true, show: false, title: 'Admin' });
  }

  showHandover() {
    return loadView('views/handover', { parent: this.mainWindow, modal: true, show: false, title: 'Handover' });

  }

  showOpenDialog(options) {
    return new Promise((resolve) => {
      dialog.showOpenDialog(this.mainWindow ? this.mainWindow : null, options, (e) => resolve(e));
    });
  }

  showMessageDialog(options) {
    return new Promise((resolve) => {
      dialog.showMessageBox(this.mainWindow ? this.mainWindow : null, options, (e) => resolve(e));
    });
  }
}

module.exports = MainPresenter;