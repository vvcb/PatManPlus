function remoteRequire(module) {
  return require('electron').remote.require(module);
}

var log = require('electron-log');
log.transports.console.level = 'debug';
log.appName = 'PatManPlus';

$(() => {
  const backend = remoteRequire('./app/backend/app');

  var shared_folder = './fixtures/sample/';

  console.log('Using the following shared folder: ', shared_folder);
  backend.initialize(shared_folder);

  var searchCriteria = {
    availableWards: backend.wards.fetchAll().concat({name: null}),
    availableConsultants: backend.consultants.fetchAll().concat({name: null, initials: null}),
    availableTeams: backend.teams.fetchAll().concat({name: null, code: null}),
    availableSpecialities: null,
    uid: null,
    name: null,
    is_discharged: 0,
    filters: {
      ward: null,
      consultant: null,
      team: null,
      speciality: null
    }
  };

  var patients = backend.patients.search(searchCriteria);

  $('#new-patient-panel').toggle();
  $('#filters-panel').toggle();

  new Vue({   // eslint-disable-line no-undef
    el: '#app',
    data: {
      searchCriteria: searchCriteria,
      patients: patients,
      newPatient: {}
    },
    methods: {
      search: function () {
        this.patients = backend.patients.search(this.searchCriteria);
      },
      updatePatient: function (patient) {
        backend.patients.update(patient);
        showToaster(`Patient '${patient.name}' updated`);   // eslint-disable-line no-undef
        this.patients = backend.patients.search(this.searchCriteria);
      },
      addPatient: function () {
        backend.patients.insert(this.newPatient);
        this.patients = backend.patients.search(this.searchCriteria);
        $('#new-patient-panel').toggle();
        this.newPatient = {};
      },
      togglePatientList: function () {
        $('#patient-list-panel').toggle();
      },
      toggleNewPatient: function () {
        $('#new-patient-panel').toggle();
      },
      toggleFilters: function () {
        $('#filters-panel').toggle();
      }
    }
  });
});
