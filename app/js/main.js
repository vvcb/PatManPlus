const remote = require('electron').remote;
const backend = remote.getGlobal('backend');

const log = require('electron-log');
log.transports.console.level = 'debug';
log.appName = 'PatManPlus';

$(() => {

  let dbSequence = Promise.all([
    backend.wards.fetchAll().then((wards) => wards.concat({name: null})),
    backend.consultants.fetchAll().then((consultants) => consultants.concat({name: null, initials: null})),
    backend.teams.fetchAll().then((teams) => teams.concat({name: null, code: null}))
  ]);

  $('#new-patient-panel').toggle();
  $('#filters-panel').toggle();

  let searchCriteria;

  dbSequence = dbSequence.then((results) => {
    searchCriteria = {
      availableWards: results[0],
      availableConsultants: results[1],
      availableTeams: results[2],
      availableSpecialities: null,
      uid: null,
      name: null,
      is_discharged: null,
      filters: {
        wardId: null,
        consultantId: null,
        teamId: null,
      }
    };

    return backend.patients.search(searchCriteria);
  });

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
