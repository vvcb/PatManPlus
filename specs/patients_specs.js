const patients = require('./../app/backend/patients.js');
const chai = require('chai');
const tmp = require('tmp');

chai.should();

describe('patients', () => {

  beforeEach(() => {
    const file = tmp.fileSync();
    return patients.initialize(file.name);
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
        return patients.update({uid: '99800001', name: 'Elsa Smith', team: 'Boston Celtics'});
      }).then(() => {
        return patients.fetch('99800001');
      }).then((record) => {
        record.team.should.eql('Boston Celtics');
      });
    });
  });

  describe('#fetch',() => {
    it('fetches a record', () => {
      return patients.insert({uid: '99800002', name: 'Elsa Smith'}).then(() => {
        return patients.fetch('99800002');
      }).then((record) => {
        record.uid.should.equal('99800002');
      });
    });
  });

  describe('#delete', () => {
    it('deletes a record from the filesystem', function () {
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
