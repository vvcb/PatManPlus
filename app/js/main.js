function remoteRequire(module) {
  return require('electron').remote.require(module);
}

var log = require('electron-log');
log.transports.console.level = 'debug';
log.appName = 'nhs-hack-day';

$(() => {
  	const backend = remoteRequire('./app/backend/app');;

	var shared_folder = './fixtures/sample/'

	console.log("Using the following shared folder: ", shared_folder);
  	backend.initialize(shared_folder)

  	var searchCriteria = {
		availableWards: backend.wards.fetchAll(),
		availableConsultants: backend.consultants.fetchAll(),
		availableTeams: backend.teams.fetchAll(),
		availableSpecialities: null,
		uid: null,
		name: null,
		filters: {
			ward: null,
			consultant: null,
			team: null,
			speciality: null
		}
	};

	var patients = backend.patients.fetchAll();
	console.log("All the patients have been fetched from the database");

	var electronApp = new Vue({
  		el: '#app',
  		data: {
			searchCriteria: searchCriteria,
    		patients: patients,
			newPatient: {}
  		},
		methods: {
			search: function() {
				console.log("Searching for patients using the following criteria", searchCriteria);
				this.patients = backend.patients.search(searchCriteria);
			},
			updatePatient: function (patient) {
				backend.patients.update(patient);
			},
			addPatient: function(patient) {
				console.log("addPatient");
			}
		}
	});
});
