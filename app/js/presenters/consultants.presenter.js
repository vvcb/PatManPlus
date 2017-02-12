class ConsultantsPresenter { // eslint-disable-line no-unused-vars
  constructor(element, backend, toasterHandler) {
    this.element = element;
    this.backend = backend;
    this.toasterHandler = toasterHandler;

    $(`a[data-toggle="tab"][data-target="${element}"]`).on('shown.bs.tab', () => this.reload());

    this.reload().then(() => {
      new Vue({   // eslint-disable-line no-undef
        el: element,
        data: { presenter: this },
      });
    });
  }

  reload() {
    return Promise.all([
      this.backend.consultants.fetchAll({order: 'display_order'}),
      this.backend.teams.fetchAll()
    ]).then((results) => {
      this.consultants = results[0];
      this.teams = results[1];
    });
  }

  create(item) {
    this.backend.consultants.create(item).then(() => {
      this.toasterHandler(`Consultant '${item.name}' created`);
      return this.reload();
    });
  }

  update (item) {
    this.backend.consultants.update(item).then(() => {
      this.toasterHandler(`Consultant '${item.name}' updated`);
      return this.reload();
    });
  }

  changeOrderUpClick(item) {
    this.backend.consultants.changeOrderUp(item).then(() => {
      this.toasterHandler(`Consultant '${item.name}' updated`);
      return this.reload();
    });
  }

  changeOrderDownClick(item) {
    this.backend.consultants.changeOrderDown(item).then(() => {
      this.toasterHandler(`Consultant '${item.name}' updated`);
      return this.reload();
    });
  }
}
