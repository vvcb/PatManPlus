
function createMenuTemplate(window) {
  return [
    {
      label: 'File',
      submenu: [
        {
          label: 'Print',
          role: 'print',
          click() { window.webContents.print(); }
        },
        {
          label: 'Open Dev Tools',
          role: 'dev_tools',
          click() { window.webContents.openDevTools(); }
        }
      ]
    }
  ]
}


module.exports = {
  createMenuTemplate: createMenuTemplate
};