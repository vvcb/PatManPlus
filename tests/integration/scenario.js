const fs = require('fs'),
  jsonfile = require('jsonfile');

const LOCATION = '/tmp/patman-integration-test';

var backend = require('./../../app/backend/app');
backend.initialize(LOCATION);

fs.readdirSync('fixtures').forEach(item => {
  const path = `fixtures/${item}`;
  if (fs.lstatSync(path).isDirectory())
    return;
  var patient = jsonfile.readFileSync(path);
  backend.patients.insert(patient);
});