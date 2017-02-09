const Database = require('../../app/backend/database.js');
const chai = require('chai');
const tmp = require('tmp');
const sqlite3 = require('sqlite3').verbose();

chai.should();

let patients;
let filename;

describe('patients', () => {

  beforeEach(() => {
    filename = tmp.fileSync();
    const database = new Database(filename.name);
    patients = database.patients;
    return database.createMissingTables();
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

  describe('#search', () => {
    beforeEach(() => {
      return patients.bulkInsert([
        {uid: '99900001', name: 'John Smith', consultant: 'Tommy', ward: '1A', team: 'L.A. Lakers', is_discharged: 1 },
        {uid: '99800002', name: 'Elsa Smith', consultant: 'Linda', ward: '3C', team: 'Boston Celtics',
          is_discharged: 0 }
      ]);
    });

    it('allows searching by name', () => {
      return patients.search({ name: 'oh' }).then((results) => {
        results.length.should.eql(1);
        results[0].uid.should.eql('99900001');
      });
    });

    it('allows searching by uid', () => {
      return patients.search({ uid: '998' }).then((results) => {
        results.length.should.eql(1);
        results[0].uid.should.eql('99800002');
      });
    });

    it('allows filtering by consultant', () => {
      return patients.search({
        filters: {
          consultant: 'Tommy'
        }
      }).then((results) => {
        results.length.should.eql(1);
        results[0].uid.should.eql('99900001');
      });
    });

    it('allows filtering by ward', () => {
      return patients.search({
        filters: {
          ward: '1A'
        }
      }).then((results) => {
        results.length.should.eql(1);
        results[0].uid.should.eql('99900001');
      });
    });

    it('allows filtering by team', () => {
      return patients.search({
        filters: {
          team: 'Boston Celtics'
        }
      }).then((results) => {
        results.length.should.eql(1);
        results[0].uid.should.eql('99800002');
      });
    });
    it('allows filtering by is_discharged', () => {
      return patients.search({ is_discharged: false }).then((results) => {
        results.length.should.eql(1);
        results[0].uid.should.eql('99800002');
      });
    });
  });

  describe('#update', () => {
    it('allows updating of patient records', () => {
      return patients.insert({uid: '99800001', name: 'John Smith', team: 'L.A. Lakers'}).then(() => {
        return patients.update({team: 'Boston Celtics'}, { uid: '99800001' });
      }).then(() => {
        return patients.search({ uid: '99800001'});
      }).then((record) => {
        record[0].team.should.eql('Boston Celtics');
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
        return patients.delete('99800004');
      }).then(() => {
        return patients.search();
      }).then((results) => {
        results.length.should.eql(0);
      });
    });
  });

});
