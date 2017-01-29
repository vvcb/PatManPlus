var jsonfile = require('jsonfile')

module.exports = {

	MASTER_COPY: null,

	initialize: function(filename){
		this.MASTER_COPY = filename;
	},

	fetchAll: function() {
		return jsonfile.readFileSync(this.MASTER_COPY)
	}
}
