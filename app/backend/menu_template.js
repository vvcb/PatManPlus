const { BrowserWindow } = require('electron');

function createMenuTemplate(mainPresenter) {
  return [
    {
      label: 'File',
      submenu: [
        {
          label: 'Print',
          role: 'print',
          accelerator: 'CommandOrControl+P',
          click() {
            BrowserWindow.getFocusedWindow().webContents.print();
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Handover',
          role: 'handover',
          accelerator: 'CommandOrControl+H',
          click() {
            mainPresenter.showHandover();
          }
        },
        {
          label: 'Settings',
          role: 'settings',
          accelerator: 'CommandOrControl+S',
          click() {
            mainPresenter.showAdmin();
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Quit',
          role: 'quit',
          accelerator: 'CommandOrControl+Q'
        }
      ]
    },
    {
      label: 'Dev',
      submenu: [
        {
          label: 'Toggle Dev Tools',
          role: 'dev_tools',
          accelerator: 'Shift+CommandOrControl+I',
          click() {
            BrowserWindow.getFocusedWindow().webContents.toggleDevTools();
          }
        },
        {
          label: 'Refresh',
          role: 'refresh',
          accelerator: 'CommandOrControl+R',
          click() {
            BrowserWindow.getFocusedWindow().webContents.reload();
          }
        }
      ]
    }
  ];
}


module.exports = createMenuTemplate;