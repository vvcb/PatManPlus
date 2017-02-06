const lodash = require('lodash');
const Sequelize = require('sequelize');

class Repository {
  constructor(database, dbModel) {
    this.database = database;
    this.dbModel = dbModel(database.sequelize, Sequelize);
  }

  update (data, where) {
    if (data.changed) {
      where = { id: data.id };
      data = lodash.pick(data, data.changed());
    }
    return this.database.runLockingSqliteCommand(() => {
      return this.dbModel.update(data, { where: where, individualHooks: true });
    }).then((result) => {
      if (result[0] === 0)
        throw new Error('Concurrent update error. Please reload the record');
      return result;
    });
  }

  insert (data) {
    return this.database.runLockingSqliteCommand(() => {
      return this.dbModel.create(data);
    });
  }

  bulkInsert (data) {
    return this.database.runLockingSqliteCommand(() => {
      return this.dbModel.bulkCreate(data);
    });
  }

  delete (uid) {
    return this.database.runLockingSqliteCommand(() => {
      return this.dbModel.destroy({ where: { uid: uid }});
    });
  }

  fetch (id) {
    return this.database.runLockingSqliteCommand(() => {
      return this.dbModel.findById(id);
    });
  }
}

module.exports = Repository;