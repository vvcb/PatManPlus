const Sequelize = require('sequelize');

const Patients = require('./db_models/patients');

class Database {
  constructor(dbFilePath, options) {
    options = options || {};

    const sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: dbFilePath,
      define: {
        timestamps: false
      },
      logging: options.enable_logging ? console.log : false
    });

    this.patients = Patients(sequelize, Sequelize);
    this.sequelize = sequelize;
  }

  connect() {
    return this.sequelize.authenticate();
  }

  close() {
    return this.sequelize.close();
  }

  createMissingTables() {
    return this.sequelize.sync();
  }
}

module.exports = Database;