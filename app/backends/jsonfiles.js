var fs = require('fs')
var jsonfile = require('jsonfile')
var mkdirp = require('mkdirp');
var path = require('path');


module.exports = {

	getRecordPath: function(root, id) {
		return root + '/' + id.substring(0, 3) +'/' + id + '.json';
	},

	writeRecord: function(root, id, data) {
		var filename = this.getRecordPath(root, id);
		var directory = path.dirname(filename);
		mkdirp.sync(directory);
		jsonfile.writeFileSync(filename, data);
		return filename;
	}
}
