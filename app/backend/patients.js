var lockFile = require('lockfile');
var sqlite = require('sqlite-sync');

module.exports = {

  /**
   * Initialize the connection to the database, creating the database file if required.
   * @param {Object} filename The name of the SQLite database file.
   */
  initialize: function (filename) {
    this.SQLITE_DB = filename;
    sqlite.connect(`${this.SQLITE_DB}`);
    var result = sqlite.run('CREATE TABLE IF NOT EXISTS patients(uid TEXT PRIMARY KEY, name TEXT NOT NULL, dob TEXT NULL, ward TEXT, bed TEXT, team TEXT, consultant TEXT, adm_date TEXT, dis_date TEXT, is_discharged INTEGER, problem TEXT, details TEXT, past_medical_history TEXT, tests TEXT, jobs TEXT, treatment TEXT, treatment_date TEXT, adverse_events TEXT);');
    if (result.error) {
      sqlite.close();
      throw result.error;
    } else {
      sqlite.close();
    }
  },

  /**
   * Search the patient database.
   * @param {Object} searchCriteria The search criteria for looking up patients.
   */
  search: function (searchCriteria) {
    searchCriteria = searchCriteria || {};
    var sql = 'SELECT * FROM patients WHERE 1 = 1';
    if (searchCriteria.name || searchCriteria.uid || searchCriteria.is_discharged != null) {
      var terms = '1 = 1';
      if (searchCriteria.name) {
        terms = terms + ` AND name LIKE '%${searchCriteria.name}%'`;
      }
      if (searchCriteria.uid) {
        terms = terms + ` AND uid LIKE '%${searchCriteria.uid}%'`;
      }
      if (searchCriteria.is_discharged != null) {
        terms = terms + ` AND is_discharged = ${searchCriteria.is_discharged ? 1 : 0}`;
      }
      sql = sql + ` AND (${terms})`;
    }
    if (searchCriteria.filters) {
      if (searchCriteria.filters.team) {
        sql = sql + ` AND team = '${searchCriteria.filters.team}'`;
      }
      if (searchCriteria.filters.consultant) {
        sql = sql + ` AND consultant = '${searchCriteria.filters.consultant}'`;
      }
      if (searchCriteria.filters.ward) {
        sql = sql + ` AND ward = '${searchCriteria.filters.ward}'`;
      }
    }

    return this.runLockingSqliteCommand(function () {
      var results = sqlite.run(sql);
      results.forEach(patient => patient.is_discharged = !!patient.is_discharged);
      return results;
    });
  },

  /**
   * Run a command against the database by creating and then removing a logging file.
   * @param {Function} cb The callback implementing the database call to be made.
   */
  runLockingSqliteCommand: function (cb) {
    if (lockFile.checkSync(this.lockPath())) {
      throw new Error('The database is currently locked by another user');
    }
    lockFile.lockSync(this.lockPath());
    sqlite.connect(`${this.SQLITE_DB}`);
    try {
      var result = cb();
      if (result.error)
        throw result.error;
    } finally {
      this.unlock();
    }
    return result;
  },

  /**
   * Closes the databases and removes the lock file.
   */
  unlock: function () {
    sqlite.close();
    lockFile.unlockSync(this.lockPath());
  },

  /**
   * Provides the name of the lockfile used for serializing access to the SQLite database.
   * @returns {string} The name of the lock file.
   */
  lockPath: function () {
    return `${this.SQLITE_DB}.lock`;
  },

  /**
   * Update a patient's record.
   * @param {string} uid The unique identifier for a patient.
   * @param {Object} data The patient's record details.
   */
  update: function (data) {
    return this.runLockingSqliteCommand(function () {
      return sqlite.update('patients', data, {uid: data.uid});
    });
  },

  /**
   * Insert a new patient record.
   * @param {string} uid The unique identifier for a patient.
   * @param {Object} data The patient's record details.
   */
  insert: function (data) {
    return this.runLockingSqliteCommand(function () {
      return sqlite.insert('patients', data);
    });
  },

  /**
   * Deletes a patient record.
   * @param {string} uid The unique identifier for a patient.
   */
  delete: function (uid) {
    return this.runLockingSqliteCommand(function () {
      return sqlite.run(`DELETE FROM patients WHERE uid = '${uid}'`);
    });
  },

  /**
   * Fetches a single patient record.
   * @param {string} uid The unique identifier for a patient.
   * @returns {Object} Patient record.
   */
  fetch: function (uid) {
    return this.runLockingSqliteCommand(function () {
      var x = sqlite.run(`SELECT * FROM patients WHERE uid = '${uid}'`);
      return x[0];
    });
  }
};
