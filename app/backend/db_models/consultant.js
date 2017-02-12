const Sequelize = require('sequelize');
const Repository = require('./repository');
const AdminMixin = require('./admin_mixin');

function createModel(sequelize) {
  return sequelize.define('consultants', {
    initials: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    specialty: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    teamId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    display_order: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
  });
}

class Consultant extends Repository {
  constructor(database) {
    super(database, createModel);
    Object.assign(this, AdminMixin);
  }
}

module.exports = Consultant;
