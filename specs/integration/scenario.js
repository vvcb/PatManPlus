const fs = require('fs'),
  jsonfile = require('jsonfile');

const Database = require('../../app/backend/database');

const dbFilePath = '/tmp/patman-integration-test';
const db = new Database(dbFilePath);

let sequence = db.createMissingTables();

fs.readdirSync('fixtures').forEach(item => {
  const path = `fixtures/${item}`;
  if (fs.lstatSync(path).isDirectory())
    return;
  var patient = jsonfile.readFileSync(path);
  sequence = sequence.then(() => db.patients.insert(patient));
});

sequence.then(() => {
  console.log('All records inserted!');
}).catch((err) => {
  console.log(err);
  process.exit(1);
});
