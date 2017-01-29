var path = require('path'),
	mkdirp = require('mkdirp'),
 	fs = require('fs');

module.exports = {

	consultants: {},

	patients: {},

	wards: {},

	teams: {},

	initialize: function(shared_folder) {

		if (!fs.existsSync(shared_folder)) {
			mkdirp.sync(shared_folder);
		}

		this.patients = require('./patients');
		this.patients.initialize(path.join(shared_folder, 'patients.sqlite3'));

		this.consultants = require('./json_source');
		var consultants_file = path.join(shared_folder, 'consultants.json');
		this.consultants.initialize(path.join(shared_folder, 'consultants.json'));

		this.wards = require('./json_source');
		var wards_file = path.join(shared_folder, 'wards.json');
		this.wards.initialize(wards_file);


		this.teams = require('./json_source');
		var teams_file = path.join(shared_folder, 'teams.json');
		this.teams.initialize(path.join(shared_folder, 'teams.json'));
	}
}
