
function createMenuTemplate(window) {
  return [
    {
      label: 'File',
      submenu: [
        {
          label: 'Print',
          role: 'print',
          click() { window.webContents.print(); }
        }
      ]
    }
  ]
}


module.exports = {
  createMenuTemplate: createMenuTemplate
};