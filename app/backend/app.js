const Database = require('./database');

class App {
  constructor(settings, options) {
    const database = new Database(settings.dbFilePath, options);
    this.patients = database.patients;
    this.consultants = database.consultants;
    this.wards = database.wards;
    this.teams = database.teams;
  }
}


module.exports = App;
