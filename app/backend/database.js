const Sequelize = require('sequelize');
var lockFile = require('lockfile');
const Patients = require('./patients');

function optimisticUpdate(instance, options) {
  const whereClause = { updatedAt: instance.previous('updatedAt') };
  options.where = Object.assign((options.where || {}), whereClause);
}

class Database {
  constructor(dbFilePath, options) {
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
    this.patients = new Patients(this);
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