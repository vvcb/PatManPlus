var jsonfile = require('jsonfile')
	fs = require('fs');

module.exports = {

	filename: null,

	initialize: function(filename){
		this.filename = filename;
		if (!fs.existsSync(filename)) {
			jsonfile.writeFileSync(filename, [])
		}
	},

	fetchAll: function() {
		return jsonfile.readFileSync(this.filename)
	}
}
