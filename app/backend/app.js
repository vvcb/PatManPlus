const Database = require('./database');

module.exports = {
  initialize: function (settings, options) {
    const database = new Database(settings.dbFilePath, options);
    this.patients = database.patients;
    this.consultants = database.consultants;
    this.wards = database.wards;
    this.teams = database.teams;
  }
};
