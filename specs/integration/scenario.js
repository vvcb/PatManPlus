const fs = require('fs'),
  path = require('path'),
  jsonfile = require('jsonfile');

const Database = require('../../app/backend/database');

const dbFilePath = '/tmp/patman-integration-test';
const db = new Database(dbFilePath);

let sequence = db.createMissingTables();

// load wards
const wards = JSON.parse(fs.readFileSync(path.join('fixtures', 'sample', 'wards.json')));
sequence = sequence.then(() => {
  db.wards.bulkInsert(wards);
});

// load teams
const teams = JSON.parse(fs.readFileSync(path.join('fixtures', 'sample', 'teams.json')));
sequence = sequence.then(() => {
  db.teams.bulkInsert(teams);
});

// load consultants
const consultants = JSON.parse(fs.readFileSync(path.join('fixtures', 'sample', 'consultants.json')));
sequence = sequence.then(() => {
  db.consultants.bulkInsert(consultants);
});

// load patients
fs.readdirSync('fixtures').forEach(item => {
  const filePath = path.join('fixtures', item);
  if (fs.lstatSync(filePath).isDirectory())
    return;
  var patient = jsonfile.readFileSync(filePath);
  sequence = sequence.then(() => db.patients.insert(patient));
});

sequence.then(() => {
  console.log('All records inserted!');
  db.wards.fetch(4, { include: [ db.patients.dbModel ] }).then((ward) => {
    console.log(`Ward ${ward.name} has ${ward.patients.length} patient`);
  }).then(() => {
    return db.wards.fetch(3, { include: [{ all: true, nested: true }]}).then((ward) => {
      console.log(`Ward ${ward.name} has ${ward.patients.length} patients`);
    });
  }).then(() => {
    return db.patients.search({}, { include: [{ all: true, nested: true }]}).then((patients) => {
      const p = patients[0];
      console.log(`Patient ${p.name}, is in ward ${p.ward.name} and is being seen by ${p.consultant.name} of team ${p.team.name}`);
    });
  });
}).catch((err) => {
  console.log(err);
  process.exit(1);
});
