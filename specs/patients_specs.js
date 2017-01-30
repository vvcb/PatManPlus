const records = require('./../app/backend/patients.js');
const chai = require('chai');
const tmp = require('tmp');

chai.should();

describe('records', function () {

  beforeEach(() => {
    const file = tmp.fileSync();
    records.initialize(file.name);
  });

  describe('#insert', function () {
    it('creates the record in the database', function () {
      records.insert({uid: '99900001', name: 'John Smith'});
      records.insert({uid: '99800002', name: 'Elsa Smith'});
      const all = records.search(null);
      all.length.should.eql(2);
    });
  });

  describe('#search', () => {
    it('allows searching by name', () => {
      records.insert({uid: '99900001', name: 'John Smith'});
      records.insert({uid: '99800002', name: 'Elsa Smith'});
      const search = records.search({
        name: 'oh'
      });
      search.length.should.eql(1);
      search[0].uid.should.eql('99900001');
    });
    it('allows searching by uid', () => {
      records.insert({uid: '99900001', name: 'John Smith'});
      records.insert({uid: '99800002', name: 'Elsa Smith'});
      const search = records.search({
        uid: '998'
      });
      search.length.should.eql(1);
      search[0].uid.should.eql('99800002');
    });
    it('allows filtering by consultant', () => {
      records.insert({uid: '99900001', name: 'John Smith', consultant: 'Tommy'});
      records.insert({uid: '99800002', name: 'Elsa Smith', consultant: 'Linda'});
      const search = records.search({
        filters: {
          consultant: 'Tommy'
        }
      });
      search.length.should.eql(1);
      search[0].uid.should.eql('99900001');
    });
    it('allows filtering by ward', () => {
      records.insert({uid: '99900001', name: 'John Smith', ward: '1A'});
      records.insert({uid: '99800002', name: 'Elsa Smith', ward: '3C'});
      const search = records.search({
        filters: {
          ward: '1A'
        }
      });
      search.length.should.eql(1);
      search[0].uid.should.eql('99900001');
    });
    it('allows filtering by team', () => {
      records.insert({uid: '99900001', name: 'John Smith', team: 'L.A. Lakers'});
      records.insert({uid: '99800002', name: 'Elsa Smith', team: 'Boston Celtics'});
      const search = records.search({
        filters: {
          team: 'Boston Celtics'
        }
      });
      search.length.should.eql(1);
      search[0].uid.should.eql('99800002');
    });
  });

  describe('#update', function () {
    it('allows updating of patient records', () => {
      records.insert({uid: '99800001', name: 'John Smith', team: 'L.A. Lakers'});
      records.update({uid: '99800001', name: 'Elsa Smith', team: 'Boston Celtics'});
      const record = records.fetch('99800001');
      record.team.should.eql('Boston Celtics');
    });
  });

  describe('#fetch', function () {
    it('fetches a record', () => {
      records.insert({uid: '99800002', name: 'Elsa Smith'});
      const record = records.fetch('99800002');
      record.uid.should.equal('99800002');
    });
  });

  describe('#delete', function () {
    it('deletes a record from the filesystem', function () {
      records.insert({uid: '99800004', name: 'Elsa Smith'});
      records.search(null).length.should.eql(1);
      records.delete('99800004');
      records.search(null).length.should.eql(0);
    });
  });

});
