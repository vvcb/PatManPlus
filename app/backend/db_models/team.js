const Sequelize = require('sequelize');
const Repository = require('./repository');
const AdminMixin = require('./admin_mixin');

function createModel(sequelize) {
  return sequelize.define('teams', {
    code: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    display_order: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
  });
}

class Team extends Repository {
  constructor(database) {
    super(database, createModel);
    Object.assign(this, AdminMixin);
  }
}

module.exports = Team;
