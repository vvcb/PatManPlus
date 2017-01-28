var jsonfiles = require('./../../app/backends/jsonfiles')
var chai = require('chai')
var tmp = require('tmp');

chai.should();

describe('jsonfiles', function() {

	describe('getRecordPath', function() {

		it("returns the full path", function() {
			var tmpdir = tmp.dirSync();
			var result = jsonfiles.getRecordPath(tmpdir.name, '12948473');
			result.should.equal(tmpdir.name + '/129/12948473.json')
		})
	});

	describe('writeRecord', function() {

		it("creates the record", function() {
			result = jsonfiles.writeRecord('/tmp/testing', '128473', {name: 'some random patient'})
		 	result.should.equal('/tmp/testing/128/128473.json');
		})
	});
})
