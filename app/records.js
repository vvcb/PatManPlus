var fs = require('fs');
var jsonfiles = require('./backends/jsonfiles');
var jsonfile = require('jsonfile');
var path = require('path');
var lockFile = require('lockfile');
var elasticlunr = require('elasticlunr');

function configureLucene() {
	this.addField('name');
	this.addField('ward');
	this.setRef('uid');
	this.addField('team');
	this.addField('consultant');
	this.addField('details');
	this.addField('past_medical_history');
	this.addField('tests');
	this.addField('adverse_events');
}

module.exports = {

	RECORDS_HOME_DIRECTORY: '/tmp/nhs-hack-day',

	lucene: null,

	index: null,

	findInIndex: function(field) {

	},

	removeFromIndex: function(id) {

	},

	addToIndex: function(data) {

	},

	init: function() {
		this.lucene = elasticlunr(this.configureLucene);
		var results = this.fetchAll();
		results.forEach(item => {
			this.lucene.addDoc(item);
			this.addToIndex(item);
		});
	},

	search: function(searchTerms) {
		return this.lucene.search(searchTerms);
	},

	update: function(id, data) {
		var path = jsonfiles.getRecordPath(this.RECORDS_HOME_DIRECTORY, id);
		var lockPath = `${path}.lock`
		if (fs.existsSync(path)) {
			if (fs.existsSync(lockPath)) {
				throw new Error(`The record with ID ${id} is currently locked`);
			} else {
				lockFile.lockSync();
				jsonfile.writeFileSync(path, data);
				this.addToIndex(id, data);
				lockFile.unlockSync(`${path}.lock`);
			}
		} else {
			throw new Error(`The record with ID ${id} does not exist`);
		}
	},

	insert: function(id, data) {
		this.addToIndex(data)
		return jsonfiles.writeRecord(this.RECORDS_HOME_DIRECTORY, id, data)
	},

	delete: function(id) {
		var path = jsonfiles.getRecordPath(this.RECORDS_HOME_DIRECTORY, id);
		if (fs.existsSync(path)) {
			fs.unlinkSync(path);
			this.removeFromIndex(id);
		} else {
			throw new Error(`The record with ID ${id} does not exist`);
		}
	},

	fetch: function(id) {
		var path = jsonfiles.getRecordPath(this.RECORDS_HOME_DIRECTORY, id);
		if (fs.existsSync(path)) {
			return jsonfile.readFileSync(path);
		} else {
			throw new Error(`The record with ID ${id} does not exist`);
		}
	},

	fetchAll: function() {
		var directories = fs.readdirSync(this.RECORDS_HOME_DIRECTORY);
		var results = [];
		directories.forEach((item) => {
			var folder = path.join(this.RECORDS_HOME_DIRECTORY, item);
			var listing = fs.readdirSync(folder);
			listing.forEach(record => {
				results.push(jsonfile.readFileSync(path.join(folder, record)));
			});
		})
		return results;
	}
}
