class GeneralPresenter { // eslint-disable-line no-unused-vars
  constructor(element, settings, toasterHandler, mainPresenter) {
    this.element = element;
    this.settings = settings;
    this.toasterHandler = toasterHandler;
    this.mainPresenter = mainPresenter;

    const presenter = this;

    new Vue({   // eslint-disable-line no-undef
      el: element,
      data: { settings: settings },
      methods: {
        updateDbPathClick() {
          presenter.updateDbPath();
        }
      }
    });
  }

  updateDbPath() {
    const filePickerSettings = { properties: ['openFile'] };
    this.mainPresenter.showOpenDialog(filePickerSettings,  (filePaths) => {
      this.settings.writeConfigFile(filePaths[0]).then(() => {
        this.toasterHandler('Database file path updated');
      });
    });
  }
}
