var records = require('./../app/records.js')
var fs = require('fs');
var touch = require("touch")
var mkdirp = require('mkdirp');
var chai = require('chai');
var tmp = require('tmp');
var path = require('path');

describe('records', function() {

	beforeEach(() => {
		records.RECORDS_HOME_DIRECTORY = tmp.dirSync().name;
		records.lucene = null;
		records.index = null;
	});

	describe('#insert', function() {
		it("creates the record on the filesystem", function() {
			records.insert('2347231212', {
				name: 'zxczcxzxc',
				location: 'ward A'
			});
			fs.existsSync('/tmp/testing/234/2347231212.json').should.be.true;
		})
	})

	describe("#init", function() {
		it("initializes the index", function() {
			records.insert('99900001', {
				patient: {
					id: '99900001',
					name: 'John'
				}
			});
			records.insert('99800002', {
				patient: {
					id: '99800002',
					name: 'Elsa'
				}
			});
			records.init();
			console.log(records.index);
		});
		it("initializes lucene", function() {
			records.insert('99900001', {
				patient: {
					id: '99900001',
					name: 'John'
				}
			});
			records.insert('99800002', {
				patient: {
					id: '99800002',
					name: 'Elsa'
				}
			});
			records.init();
			console.log(records.lucene);
		})
	});

	describe('#update', function() {

	})

	describe('#fetch', function() {
		it("fetches a record", () => {
			records.insert('123456789', {a: 'b'});
			var record = records.fetch('123456789')
			record.a.should.equal('b');
		})
	})

	describe('#fetchAll', function() {
		it("fetches all records", () => {
			records.insert('99900001', {
				patient: {
					id: '99900001',
					name: 'John'
				}
			});
			records.insert('99800002', {
				patient: {
					id: '99800002',
					name: 'Elsa'
				}
			});
			records.insert('99900003',{
				patient: {
					id: '99900003',
					name: 'Paula'
				}
			});
			var results = records.fetchAll()
			results[0].patient.id.should.equal('99800002');
		});
	});

	describe('#delete', function() {
		it("deletes a record from the filesystem", function() {
			records.insert('99900009',{
				patient: {
					id: '99900009',
					name: 'Paula'
				}
			});
			fs.existsSync(path.join(records.RECORDS_HOME_DIRECTORY, '999/99900009.json')).should.be.true;
			records.delete('99900009')
			fs.existsSync(path.join(records.RECORDS_HOME_DIRECTORY, '999/99900009.json')).should.be.false;
		})
	})

})
