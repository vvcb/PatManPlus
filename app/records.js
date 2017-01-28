var fs = require('fs');
var util = require('./backends/jsonfiles');

RECORDS_HOME_DIRECTORY = '/tmp/nhs-hack-day'

module.exports = {

	init: function() {
		ensureHomeDirectoryExists();
	},

	update: function(id, data) {

	},

	insert: function(id, data) {
		util.writeRecord(RECORDS_HOME_DIRECTORY, id, data)
	},

	delete: function(id) {
		var path = util.getRecordPath(RECORDS_HOME_DIRECTORY, id);
		if (fs.exists(path)) {
			fs.unlinkSync(path);
			// check if directory is empty, then delete it
		}
	},

	fetch: function(id) {

	},

	fetchAll: function() {

	}
}
