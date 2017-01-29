var path = require('path');

module.exports = {

	consultants: null,

	patients: null,

	wards: null,

	teams: null,

	initialize: function(shared_folder) {
		this.patients = require('./patients');
		this.patients.initialize(path.join(shared_folder, 'patients.sqlite3'));
		this.wards = require('./wards');
		this.wards.initialize(path.join(shared_folder, 'wards.json'));
		this.teams = require('./teams');
		this.teams.initialize(path.join(shared_folder, 'teams.json'));
		this.consultants = require('./consultants');
		this.consultants.initialize(path.join(shared_folder, 'consultants.json'));
	}
}
