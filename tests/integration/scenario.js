const fs = require('fs'),
  jsonfile = require('jsonfile');

const dbFilePath = '/tmp/patman-integration-test';

const patients = require('../../app/backend/patients.js');
let sequence = patients.initialize(dbFilePath);

fs.readdirSync('fixtures').forEach(item => {
  const path = `fixtures/${item}`;
  if (fs.lstatSync(path).isDirectory())
    return;
  var patient = jsonfile.readFileSync(path);
  sequence = sequence.then(() => patients.insert(patient));
});

sequence.then(() => {
  console.log('All records inserted!');
}).catch((err) => {
  console.log(err);
  process.exit(1);
});
