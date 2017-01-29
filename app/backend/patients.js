var fs = require('fs');
var path = require('path');
var lockFile = require('lockfile');
var sqlite = require('sqlite-sync');

module.exports = {

	initialize: function(filename) {
		this.SQLITE_DB = filename;
		sqlite.connect(`${this.SQLITE_DB}`);
		var result = sqlite.run("CREATE TABLE IF NOT EXISTS patients(uid TEXT PRIMARY KEY, name TEXT NOT NULL, dob TEXT NULL, ward TEXT, bed TEXT, team TEXT, consultant TEXT, adm_date TEXT, dis_date TEXT, is_discharged TEXT, problem TEXT, details TEXT, past_medical_history TEXT, tests TEXT, jobs TEXT, treatment TEXT, treatement_date TEXT, adverse_events TEXT);");
		if (result.error) {
			sqlite.close();
			throw result.error;
		} else {
			sqlite.close();
		}
	},

	search: function(term, filters) {
		this.lock();
		var sql = "SELECT * FROM patients WHERE 1 = 1"
		if (term) {
			sql = sql + ` AND (name LIKE '%${term}%' OR uid LIKE '%${term}%')`
		}
		if (filters) {
			if (filters.team) {
				sql = sql + ` AND team = '${filters.team}'`;
			}
			if (filters.consultant) {
				sql = sql + ` AND consultant = '${filters.consultant}'`;
			}
			if (filters.ward) {
				sql = sql + ` AND ward = '${filters.ward}'`
			}
		}
		var result = sqlite.run(sql);
		return this.ensureSuccess(result, x => {
			return x;
		});
	},

	ensureDatabaseUnlocked: function() {
		if (fs.existsSync(this.lockPath())) {
			throw new Error(`The database is currently locked by another user`);
		}
	},

	lock: function() {
		this.ensureDatabaseUnlocked();
		lockFile.lockSync(this.lockPath());
		sqlite.connect(`${this.SQLITE_DB}`);
	},

	unlock: function() {
		sqlite.close();
		lockFile.unlockSync(this.lockPath());
	},

	lockPath: function() {
		return `${this.SQLITE_DB}.lock`;
	},

	/**
	 * Update a patient's record.
	 * @param {string} uid The unique identifier for a patient.
	 * @param {Object} data The patient's record details.
	 */
	update: function(data) {
		this.lock();
		var result = sqlite.update("patients", data, {uid: data.uid});
		return this.ensureSuccess(result);
	},

	ensureSuccess: function(result, cb) {
		if (result.error) {
			this.unlock();
			throw result.error;
		} else {
			this.unlock();
			if (cb)
				return cb(result);
		}
	},

	/**
	 * Insert a new patient record.
	 * @param {string} uid The unique identifier for a patient.
	 * @param {Object} data The patient's record details.
	 */
	insert: function(data) {
		this.lock();
		var results = sqlite.insert("patients", data);
		if (results.error) {
			this.unlock();
			throw results.error;
		} else {
			this.unlock();
		}
	},

	/**
	 * Deletes a patient record.
	 * @param {string} uid The unique identifier for a patient.
	 */
	delete: function(uid) {
		this.lock();
		var result = sqlite.run(`DELETE FROM patients WHERE uid = '${uid}'`);
		this.ensureSuccess(result);
	},

	/**
	 * Fetches a single patient record.
	 * @param {string} uid The unique identifier for a patient.
	 * @returns {Object} Patient record.
	 */
	fetch: function(uid) {
		this.lock();
		var result = sqlite.run(`SELECT * FROM patients WHERE uid = '${uid}'`);
		return this.ensureSuccess(result, x => {
			return x[0];
		});
	},

	/**
	 * Fetchs all available patient records.
	 * @returns {Array} Patient records.
	 */
	fetchAll: function() {
		this.lock();
		var result = sqlite.run("SELECT * FROM patients");
		return this.ensureSuccess(result, x => {
			return x;
		});
	}
}
