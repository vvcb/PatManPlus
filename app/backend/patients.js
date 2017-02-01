var lockFile = require('lockfile');
const Database = require('./database');

module.exports = {

  /**
   * Initialize the connection to the database, creating the database file if required.
   * @param {Object} filename The name of the SQLite database file.
   */
  initialize: function (filename, options) {
    this.SQLITE_DB = filename;
    this.database = new Database(filename, options);
    return this.database.createMissingTables();
  },

  /**
   * Search the patient database.
   * @param {Object} searchCriteria The search criteria for looking up patients.
   */
  search: function (searchCriteria) {
    searchCriteria = searchCriteria || {};

    const query = {};

    if (searchCriteria.name != null)
      query.name = { $like: `%${searchCriteria.name}%`};

    if (searchCriteria.uid != null)
      query.uid = { $like: `%${searchCriteria.uid}%`};

    if (searchCriteria.is_discharged != null)
      query.is_discharged = searchCriteria.is_discharged;

    if (searchCriteria.filters && searchCriteria.filters.consultant != null)
      query.consultant = searchCriteria.filters.consultant;

    if (searchCriteria.filters && searchCriteria.filters.ward != null)
      query.ward = searchCriteria.filters.ward;

    if (searchCriteria.filters && searchCriteria.filters.team != null)
      query.team = searchCriteria.filters.team;

    return this.runLockingSqliteCommand((db) => {
      return db.patients.findAll({ where: query });
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
    // sqlite.connect(`${this.SQLITE_DB}`);
    try {
      return cb(this.database);
    } catch(err) {
      console.log(err);
      throw err;
    } finally {
      this.unlock();
    }
  },

  /**
   * Closes the databases and removes the lock file.
   */
  unlock: function () {
    // this.database.close();
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
    return this.runLockingSqliteCommand((db) => {
      if (data.save)
        return data.save();
      else
        return db.patients.update(data, { where: { uid: data.uid }});
    });
  },

  /**
   * Insert a new patient record.
   * @param {string} uid The unique identifier for a patient.
   * @param {Object} data The patient's record details.
   */
  insert: function (data) {
    return this.runLockingSqliteCommand((db) => {
      return db.patients.create(data);
    });
  },

  bulkInsert: function(data) {
    return this.runLockingSqliteCommand((db) => {
      return db.patients.bulkCreate(data);
    });
  },

  /**
   * Deletes a patient record.
   * @param {string} uid The unique identifier for a patient.
   */
  delete: function (uid) {
    return this.runLockingSqliteCommand((db) => {
      return db.patients.destroy({ where: { uid: uid }});
    });
  },

  /**
   * Fetches a single patient record.
   * @param {string} uid The unique identifier for a patient.
   * @returns {Object} Patient record.
   */
  fetch: function (uid) {
    return this.runLockingSqliteCommand((db) => {
      return db.patients.findById(uid);
    });
  }
};
