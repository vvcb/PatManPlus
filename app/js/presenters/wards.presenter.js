class WardsPresenter { // eslint-disable-line no-unused-vars
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
    return this.backend.wards.fetchAll({order: 'display_order'}).then((wards) => {
      this.wards = wards;
    });
  }

  create(item) {
    this.backend.wards.create(item).then(() => {
      this.toasterHandler(`Ward '${item.name}' created`);
      return this.reload();
    });
  }

  update (item) {
    this.backend.wards.update(item).then(() => {
      this.toasterHandler(`Ward '${item.name}' updated`);
      return this.reload();
    });
  }

  changeOrderUpClick(item) {
    this.backend.wards.changeOrderUp(item).then(() => {
      this.toasterHandler(`Ward '${item.name}' updated`);
      return this.reload();
    });
  }

  changeOrderDownClick(item) {
    this.backend.wards.changeOrderDown(item).then(() => {
      this.toasterHandler(`Ward '${item.name}' updated`);
      return this.reload();
    });
  }
}
