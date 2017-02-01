const remote = require('electron').remote;
const backend = remote.getGlobal('backend');

var log = require('electron-log');
log.transports.console.level = 'debug';
log.appName = 'PatManPlus';

$(() => {
  var shared_folder = './fixtures/sample/';

  console.log('Using the following shared folder: ', shared_folder);
  let dbSequence = backend.initialize(shared_folder, { enable_logging: true });

  var searchCriteria = {
    availableWards: backend.wards.fetchAll().concat({name: null}),
    availableConsultants: backend.consultants.fetchAll().concat({name: null, initials: null}),
    availableTeams: backend.teams.fetchAll().concat({name: null, code: null}),
    availableSpecialities: null,
    uid: null,
    name: null,
    is_discharged: null,
    filters: {
      ward: null,
      consultant: null,
      team: null,
      speciality: null
    }
  };


  $('#new-patient-panel').toggle();
  $('#filters-panel').toggle();

  dbSequence = dbSequence.then(() => backend.patients.search(searchCriteria));

  dbSequence.then((patients) => {
    new Vue({   // eslint-disable-line no-undef
      el: '#app',
      data: {
        searchCriteria: searchCriteria,
        patients: patients,
        newPatient: {}
      },
      methods: {
        search: function () {
          backend.patients.search(this.searchCriteria).then((patients) => this.patients = patients);
        },
        updatePatient: function (patient) {
          backend.patients.update(patient).then(() => {
            return backend.patients.search(this.searchCriteria);
          }).then((patients) => {
            this.patients = patients;
          });
          showToaster(`Patient '${patient.name}' updated`);   // eslint-disable-line no-undef
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
});
