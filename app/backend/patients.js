var fs = require('fs');
var path = require('path');
var lockFile = require('lockfile');
var sqlite = require('sqlite-sync');

module.exports = {

	initialize: function(filename) {
		this.SQLITE_DB = filename;
		sqlite.connect(`${this.SQLITE_DB}`);
		var result = sqlite.run("CREATE TABLE IF NOT EXISTS patients(uid TEXT PRIMARY KEY, name TEXT NOT NULL, dob TEXT NULL, ward TEXT, bed TEXT, team TEXT, consultant TEXT, adm_date TEXT, dis_date TEXT, is_discharged TEXT, problem TEXT, details TEXT, past_medical_history TEXT, tests TEXT, jobs TEXT, treatment TEXT, treatment_date TEXT, adverse_events TEXT);");
		if (result.error) {
			sqlite.close();
			throw result.error;
		} else {
			sqlite.close();
		}
	},

	search: function(searchCriteria) {
		var sql = "SELECT * FROM patients WHERE 1 = 1"
		if (searchCriteria.name || searchCriteria.uid) {
			sql = sql + ` AND (name LIKE '%${searchCriteria.name}%' OR uid LIKE '%${searchCriteria.uid}%')`
		}
		if (searchCriteria.team) {
			sql = sql + ` AND team = '${searchCriteria.team}'`;
		}
		if (searchCriteria.consultant) {
			sql = sql + ` AND consultant = '${searchCriteria.consultant}'`;
		}
		if (searchCriteria.ward) {
			sql = sql + ` AND ward = '${searchCriteria.ward}'`
		}

		return this.runLockingSqliteCommand(function() {
			return sqlite.run(sql);;
		});
	},

	runLockingSqliteCommand: function(cb) {
		if (fs.existsSync(this.lockPath())) {
			throw new Error(`The database is currently locked by another user`);
		}
		lockFile.lockSync(this.lockPath());
		sqlite.connect(`${this.SQLITE_DB}`);
		try
		{
			var result = cb();
			if (result.error)
				throw result.error;
		} finally {
			this.unlock();
		}
		return result;
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
		return this.runLockingSqliteCommand(function() {
			return sqlite.update("patients", data, {uid: data.uid});
		});
	},

	/**
	 * Insert a new patient record.
	 * @param {string} uid The unique identifier for a patient.
	 * @param {Object} data The patient's record details.
	 */
	insert: function(data) {
		return this.runLockingSqliteCommand(function() {
			return sqlite.insert("patients", data);
		});
	},

	/**
	 * Deletes a patient record.
	 * @param {string} uid The unique identifier for a patient.
	 */
	delete: function(uid) {
		return this.runLockingSqliteCommand(function() {
			return sqlite.run(`DELETE FROM patients WHERE uid = '${uid}'`);
		});
	},

	/**
	 * Fetches a single patient record.
	 * @param {string} uid The unique identifier for a patient.
	 * @returns {Object} Patient record.
	 */
	fetch: function(uid) {
		return this.runLockingSqliteCommand(function() {
			var x = sqlite.run(`SELECT * FROM patients WHERE uid = '${uid}'`);
			return x[0];
		});
	},

	/**
	 * Fetchs all available patient records.
	 * @returns {Array} Patient records.
	 */
	fetchAll: function() {
		return this.runLockingSqliteCommand(function() {
			return sqlite.run("SELECT * FROM patients");
		});
	}
}
