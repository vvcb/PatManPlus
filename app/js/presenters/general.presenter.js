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
    this.settings.showDbFilePicker(false).then(() => {
      this.toasterHandler('Database file path updated');
    });
  }
}
