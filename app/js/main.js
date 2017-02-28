const remote = require('electron').remote;
const backend = remote.getGlobal('backend');

const log = require('electron-log');
log.transports.console.level = 'debug';
log.appName = 'PatManPlus';

const searchCriteria = {
  uid: null,
  name: null,
  is_discharged: null,
  filters: {
    wardId: null,
    consultantId: null,
    teamId: null,
  }
};

window.Parsley.addValidator('duplicateuid', {
  validateString: function(uid, patientId) {
    return new Promise((resolve, reject) => {
      backend.patients.search({ uid }).then((patients) => {
        if (patients.length === 1 && patients[0].id === patientId)
          resolve();
        else
          patients.length === 0 ? resolve() : reject();
      });
    });
  },
  messages: {
    en: 'Patient with this UID already exists',
  }
});

$(() => {
  let dbSequence = Promise.all([
    backend.wards.fetchAll().then((wards) => wards.concat({name: null})),
    backend.consultants.fetchAll().then((consultants) => consultants.concat({name: null, initials: null})),
    backend.teams.fetchAll().then((teams) => teams.concat({name: null, code: null})),
    backend.patients.search()
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
        },
        patientUpdated: function (patient) {
          showToaster(`Patient '${patient.name}' updated`);   // eslint-disable-line no-undef
          backend.patients.search(searchCriteria).then((patients) => this.patients = patients);
        },
        patientReloaded: function(patient) {
          showToaster(`Patient '${patient.name}' reloaded`);   // eslint-disable-line no-undef
        },
        patientCreated: function (patient) {
          showToaster(`Patient '${patient.name}' added`);   // eslint-disable-line no-undef
          backend.patients.search(searchCriteria).then((patients) => this.patients = patients);
        },
        togglePatientList: function () {
          $('#patient-list-panel').toggle();
        }
      }
    });

    $('#loading').hide();
    $('#app').toggle();
  });
});
