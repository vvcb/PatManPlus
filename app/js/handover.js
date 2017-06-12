const remote = require('electron').remote;
const backend = remote.getGlobal('backend');
const searchCriteria = remote.getGlobal('searchCriteria');

$(() => {
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' || event.keyCode === 27) {
      window.close();
    }
  });

  let dbSequence = Promise.all([
    backend.wards.fetchAll(),
    backend.consultants.fetchAll(),
    backend.teams.fetchAll(),
    backend.patients.search(searchCriteria)
  ]);

  let wards, consultants, teams, patients;

  dbSequence.then((results) => {
    [wards, consultants, teams, patients] = results;
    new Vue({   // eslint-disable-line no-undef
      el: '#app',
      data: {
        backend: backend,
        criteria: searchCriteria,
        wards: wards,
        consultants: consultants,
        teams: teams,
        patients: patients,
      },
      methods: {
        search: function () {
          backend.patients.search(searchCriteria).then((patients) => this.patients = patients);
        }
      }
    });

    $('#loading').hide();
    $('#app').toggle();
  });
});
