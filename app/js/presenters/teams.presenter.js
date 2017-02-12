class TeamsPresenter { // eslint-disable-line no-unused-vars
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
    return this.backend.teams.fetchAll({order: 'display_order'}).then((teams) => {
      this.teams = teams;
    });
  }

  create(item) {
    this.backend.teams.create(item).then(() => {
      this.toasterHandler(`Team '${item.name}' created`);
      return this.reload();
    });
  }

  update (item) {
    this.backend.teams.update(item).then(() => {
      this.toasterHandler(`Team '${item.name}' updated`);
      return this.reload();
    });
  }

  changeOrderUpClick(item) {
    this.backend.teams.changeOrderUp(item).then(() => {
      this.toasterHandler(`Team '${item.name}' updated`);
      return this.reload();
    });
  }

  changeOrderDownClick(item) {
    this.backend.teams.changeOrderDown(item).then(() => {
      this.toasterHandler(`Team '${item.name}' updated`);
      return this.reload();
    });
  }
}
