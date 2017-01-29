function remoteRequire(module) {
  return require('electron').remote.require(module);
}

var log = require('electron-log');
log.transports.console.level = 'debug';
log.appName = 'nhs-hack-day';

$(() => {
  	const backend = remoteRequire('./app/backend/app');;

  	backend.initialize('/tmp/nhs-hack-day/integration-test')

  	console.log(backend.patients.fetchAll());

	var electronApp = new Vue({
  		el: '#app',
  		data: {
    		patients: backend.patients.fetchAll()
  		},
    methods: {
      saveFile: function () {
        debugger;
        console.log(file);
        console.log(patient);
      }
    }
	});
});
