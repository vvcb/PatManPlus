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
          label: 'Open Dev Tools',
          role: 'dev_tools',
          accelerator: 'Shift+CommandOrControl+I',
          click() {
            window.webContents.openDevTools();
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
    }
  ];
}


module.exports = {
  createMenuTemplate: createMenuTemplate
};