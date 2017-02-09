function createMenuTemplate(window) {
  return [
    {
      label: 'File',
      submenu: [
        {
          label: 'Print',
          role: 'print',
          accelerator: 'CommandOrControl+P',
          click() {
            window.webContents.print();
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Quit',
          role: 'quit',
          accelerator: 'CommandOrControl+Q',
          click() {
            window.webContents.openDevTools();
          }
        }
      ]
    },
    {
      label: 'Dev',
      submenu: [
        {
          label: 'Open Dev Tools',
          role: 'dev_tools',
          accelerator: 'Shift+CommandOrControl+I',
          click() {
            window.webContents.toggleDevTools();
          }
        },
        {
          label: 'Refresh',
          role: 'refresh',
          accelerator: 'CommandOrControl+R',
          click() {
            window.webContents.reload();
          }
        }
      ]
    }
  ];
}


module.exports = {
  createMenuTemplate: createMenuTemplate
};