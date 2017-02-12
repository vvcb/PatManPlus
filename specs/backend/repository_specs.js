const Database = require('../../app/backend/database.js');
const chai = require('chai');
const tmp = require('tmp');
const sqlite3 = require('sqlite3').verbose();

chai.should();

let database;
let patients;
let filename;

const wards = [{ name: '8', display_order: 1 },
  { name: '11', display_order: 2 }];

const teams = [{ code: 'HPB', name: 'Hepatobiliary Surgery', display_order: 1 },
  { code: 'CR-Blue', name: 'Colorectal - Blue', display_order: 2 }];

const consultants = [
  { initials: 'BJM', name: 'Dr. Bill Murray', specialty: 'General Medicine', teamId: 2, display_order: 1 },
  { initials: 'RDES', name: 'Mr. Rahul Deshpande', specialty: 'HPB Surgery', teamId: 1, display_order: 2 }
];


describe('repository', () => {
  beforeEach(() => {
    filename = tmp.fileSync();
    database = new Database(filename.name);
    patients = database.patients;
    return database.createMissingTables()
    .then(() => database.wards.bulkInsert(wards))
    .then(() => database.teams.bulkInsert(teams))
    .then(() => database.consultants.bulkInsert(consultants));
  });

  describe('#insert', () => {
    it('creates the record in the database', function () {
      return patients.bulkInsert([
        {uid: '99900001', name: 'John Smith'},
        {uid: '99800002', name: 'Elsa Smith'}
      ]).then(() => {
        return patients.search();
      }).then((all) => {
        all.length.should.eql(2);
      });
    });
  });

  describe('#update', () => {
    it('allows updating of patient records', () => {
      return patients.insert({uid: '99800001', name: 'John Smith', teamId: 1, wardId: 1, consultantId: 1}).then(() => {
        return patients.update({teamId: 2}, { uid: '99800001' });
      }).then(() => {
        return patients.search({ uid: '99800001'});
      }).then((record) => {
        record[0].teamId.should.eql(2);
      });
    });

    it('fails on concurrent updates to same record', () => {
      return new Promise((resolve) => {
        patients.insert({uid: '99800001', name: 'John Smith', team: 'L.A. Lakers'}).then(() => {
          return patients.search({ uid: '99800001'}).then((results) => results[0]);
        }).then((patient) => {
          const db = new sqlite3.Database(filename.name);
          const updatedAt = new Date().toISOString().replace('T', ' ');
          const sql = `UPDATE \`patients\` SET \`updatedAt\` = '${updatedAt}' WHERE \`id\` = 1`;
          db.serialize(() => {
            db.run(sql, () => db.close());
          });
          return patient;
        }).then((patient) => {
          patient.team = 'Orlando Magic';
          return patients.update(patient);
        }).catch((err) => {
          err.message.should.eql('Concurrent update error. Please reload the record');
          resolve();
        });
      });
    });
  });

  describe('#fetch',() => {
    it('fetches a record', () => {
      return patients.insert({uid: '99800002', name: 'Elsa Smith'}).then(() => {
        return patients.search({uid: '99800002'});
      }).then((record) => {
        record[0].uid.should.equal('99800002');
      });
    });
  });

  describe('#delete', () => {
    it('deletes a record from the filesystem', () => {
      return patients.insert({uid: '99800004', name: 'Elsa Smith'}).then(() => {
        return patients.search();
      }).then((results) => {
        results.length.should.eql(1);
        return patients.remove('99800004');
      }).then(() => {
        return patients.search();
      }).then((results) => {
        results.length.should.eql(0);
      });
    });
  });

});
