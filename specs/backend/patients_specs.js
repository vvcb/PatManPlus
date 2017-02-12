const Database = require('../../app/backend/database.js');
const chai = require('chai');
const tmp = require('tmp');

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


describe('patients', () => {
  beforeEach(() => {
    filename = tmp.fileSync();
    database = new Database(filename.name);
    patients = database.patients;
    return database.createMissingTables()
      .then(() => database.wards.bulkInsert(wards))
      .then(() => database.teams.bulkInsert(teams))
      .then(() => database.consultants.bulkInsert(consultants));
  });

  describe('#search', () => {
    beforeEach(() => {
      return patients.bulkInsert([
        {uid: '99900001', name: 'John Smith', consultantId: 1, wardId: 1, teamId: 1, is_discharged: 1 },
        {uid: '99800002', name: 'Elsa Smith', consultantId: 2, wardId: 2, teamId: 2, is_discharged: 0 }
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
          consultantId: 1
        }
      }).then((results) => {
        results.length.should.eql(1);
        results[0].uid.should.eql('99900001');
      });
    });

    it('allows filtering by ward', () => {
      return patients.search({
        filters: {
          wardId: 1
        }
      }).then((results) => {
        results.length.should.eql(1);
        results[0].uid.should.eql('99900001');
      });
    });

    it('allows filtering by team', () => {
      return patients.search({
        filters: {
          teamId: 2
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
});
