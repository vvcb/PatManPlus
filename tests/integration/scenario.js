var fs = require('fs'),
	jsonfile = require('jsonfile');

LOCATION = '/tmp/nhs-hack-day/integration-test';

var backend = require('./../../app/backend/app');
backend.initialize(LOCATION)

fs.readdirSync('fixtures').forEach(item => {
 	var patient = jsonfile.readFileSync('fixtures/' + item);
	backend.patients.insert(patient);
});
