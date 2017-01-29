function remoteRequire(module) {
  return require('electron').remote.require(module);
}

var log = require('electron-log');
log.transports.console.level = 'debug';
log.appName = 'nhs-hack-day';

$(() => {

  	const backend = remoteRequire('./app/backend/app');;

  	backend.initialize('/tmp/nhs-hack-day/integration-test')

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

	var electronApp = new Vue({
  		el: '#app',
  		data: {
			searchCriteria: searchCriteria,
    		patients: patients
  		},
		methods: {
			search: function() {
				console.log('hello');
			}
		}
	});
});
