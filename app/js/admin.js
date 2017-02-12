/* global GeneralPresenter, WardsPresenter, TeamsPresenter,ConsultantsPresenter,showToaster */

$(() => {
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' || event.keyCode === 27) {
      window.close();
    }
  });

  const electron = require('electron');
  const backend = electron .remote.getGlobal('backend');
  const settings = electron.remote.getGlobal('settings');
  const mainPresenter = electron.remote.getGlobal('mainPresenter');

  new GeneralPresenter('#general', settings, showToaster, mainPresenter);
  new WardsPresenter('#wards', backend, showToaster);
  new TeamsPresenter('#teams', backend, showToaster);
  new ConsultantsPresenter('#consultants', backend, showToaster);
});
