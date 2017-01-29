
var faker = require('faker');
var chai = require('chai');
var tmp = require('tmp');
var app = require('./../../app/backend/app.js');
chai.should();

describe('patients - tests - performance', function() {

	beforeAll(() => {
		var dir = tmp.dirSync();
		app.initialize(dir.name);
		for(var i = 0; i < 500; i++) {
			app.patients.insert({
				uid: i,
				name: faker.name.findName().replace('\'', '\'\''),
				dob: faker.date.between('01/01/1920', '01/01/2014')
			});
		}
	});

	it("can retrieve patient records in under 2 seconds", () => {

	});
})
