const Sequelize = require('sequelize');
const lockFile = require('lockfile');
const Patient = require('./db_models/patient');
const Consultant = require('./db_models/consultant');
const Ward = require('./db_models/ward');
const Team = require('./db_models/team');
const logger = require('./logger');

function optimisticUpdate(instance, options) {
  const whereClause = { updatedAt: instance.previous('updatedAt') };
  options.where = Object.assign((options.where || {}), whereClause);
}

class Database {
  constructor(dbFilePath, options) {
    logger.debug(`Loading database file at '${dbFilePath}'`);
    options = options || {};

    const sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: dbFilePath,
      define: {
        hooks: {
          beforeUpdate: optimisticUpdate,
        }
      },
      logging: options.enable_logging ? console.log : false
    });

    this.dbFilePath = dbFilePath;
    this.sequelize = sequelize;
    this.patients = new Patient(this);
    this.teams = new Team(this);
    this.consultants = new Consultant(this);
    this.wards = new Ward(this);

    this.teams.dbModel.hasMany(this.patients.dbModel);
    this.teams.dbModel.hasMany(this.consultants.dbModel);
    this.wards.dbModel.hasMany(this.patients.dbModel);
    this.consultants.dbModel.belongsTo(this.teams.dbModel);

    this.patients.dbModel.belongsTo(this.wards.dbModel);
    this.patients.dbModel.belongsTo(this.teams.dbModel);
    this.patients.dbModel.belongsTo(this.consultants.dbModel);
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

  runLockingSqliteCommand (cb) {
    if (lockFile.checkSync(this.lockPath())) {
      throw new Error('The database is currently locked by another user');
    }
    lockFile.lockSync(this.lockPath());
    try {
      return cb();
    } catch(err) {
      console.log(err);
      throw err;
    } finally {
      this.unlock();
    }
  }

  unlock () {
    lockFile.unlockSync(this.lockPath());
  }

  lockPath () {
    return `${this.dbFilePath}.lock`;
  }
}

module.exports = Database;