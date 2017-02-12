const Database = require('../../app/backend/database.js');
const chai = require('chai');
const tmp = require('tmp');

chai.should();

let database;
let wards;
let filename;

const wardExamples = [
  { name: '8', display_order: 1 },
  { name: '11', display_order: 2 },
  { name: '12', display_order: 3 }
];

describe('admin_mixin', () => {
  beforeEach(() => {
    filename = tmp.fileSync();
    database = new Database(filename.name);
    wards = database.wards;
    return database.createMissingTables().then(() => wards.bulkInsert(wardExamples));
  });

  describe('#changeOrderUp', () => {
    it('can swap 2nd and 1st items', () => {
      return wards.fetch(2).then(ward =>  wards.changeOrderUp(ward))
                    .then(() => wards.fetchAll({ order: 'display_order' }))
                    .then((records) => {
                      records.length.should.eql(3);
                      records[0].name.should.eql('11');
                      records[0].id.should.eql(2);
                      records[1].name.should.eql('8');
                      records[1].id.should.eql(1);
                    });

    });
  });

  describe('#changeOrderDown', () => {
    it('can swap 2nd and 3rd items', () => {
      return wards.fetch(2).then(ward =>  wards.changeOrderDown(ward))
      .then(() => wards.fetchAll({ order: 'display_order' }))
      .then((records) => {
        records.length.should.eql(3);
        records[1].name.should.eql('12');
        records[1].id.should.eql(3);
        records[2].name.should.eql('11');
        records[2].id.should.eql(2);
      });

    });
  });

  describe('#create', () => {
    it('determines next display order and inserts', () => {
      return wards.create({ name: '13'}).then((ward) => {
        ward.display_order.should.eql(4);
      });
    });
  });
});