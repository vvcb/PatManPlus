const path = require('path'),
  mkdirp = require('mkdirp'),
  JsonSource = require('./json_source');
const fs = require('fs');

const Database = require('./database');

module.exports = {

  consultants: {},

  patients: {},

  wards: {},

  teams: {},

  initialize: function (settings, options) {
    if (!fs.existsSync(settings.sharedFolder)) {
      mkdirp.sync(settings.sharedFolder);
    }

    const consultants_file = path.join(settings.sharedFolder, 'consultants.json');
    this.consultants = new JsonSource(consultants_file);

    const wards_file = path.join(settings.sharedFolder, 'wards.json');
    this.wards = new JsonSource(wards_file);

    const teams_file = path.join(settings.sharedFolder, 'teams.json');
    this.teams = new JsonSource(teams_file);

    const database = new Database(settings.dbFilePath, options);
    this.patients = database.patients;
  }
};
