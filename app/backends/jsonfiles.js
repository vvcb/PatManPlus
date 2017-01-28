var fs = require('fs')
var jsonfile = require('jsonfile')
var mkdirp = require('mkdirp');
var path = require('path');


module.exports = {

	ensureHomeDirectoryExists: function() {

	},

	getRecordPath: function(root, id) {
		return root + '/' + id.substring(0, 3) +'/' + id + '.json';
	},

	writeRecord: function(root, id, data, cb) {
		var filename = this.getRecordPath(root, id);
		var directory = path.dirname(filename);
		mkdirp(directory, function (err) {
		    if (err) console.error(err)
		    else jsonfile.writeFile(filename, data, cb);
		});
	}
}
