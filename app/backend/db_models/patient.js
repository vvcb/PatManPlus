const Sequelize = require('sequelize');
const Repository = require('./repository');

function createModel(sequelize) {
  return sequelize.define('patients', {
    uid: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    date_of_birth: Sequelize.DATE,
    wardId: Sequelize.INTEGER,
    bed: Sequelize.STRING,
    teamId: Sequelize.INTEGER,
    consultantId: Sequelize.INTEGER,
    admission_date: Sequelize.DATE,
    discharge_date: Sequelize.DATE,
    is_discharged: Sequelize.BOOLEAN,
    problem: Sequelize.STRING,
    details: Sequelize.STRING,
    past_medical_history: Sequelize.STRING,
    tests: Sequelize.STRING,
    jobs: Sequelize.STRING,
    treatment: Sequelize.STRING,
    treatment_date: Sequelize.DATE,
    adverse_events: Sequelize.STRING
  });
}

class Patient extends Repository {
  constructor(database) {
    super(database, createModel);
  }

  search (searchCriteria, options) {
    searchCriteria = searchCriteria || {};

    const query = {};

    if (searchCriteria.name != null)
      query.name = { $like: `%${searchCriteria.name}%`};

    if (searchCriteria.uid != null)
      query.uid = { $like: `%${searchCriteria.uid}%`};

    if (searchCriteria.is_discharged != null)
      query.is_discharged = searchCriteria.is_discharged;

    if (searchCriteria.filters && searchCriteria.filters.consultantId != null)
      query.consultantId = searchCriteria.filters.consultantId;

    if (searchCriteria.filters && searchCriteria.filters.wardId != null)
      query.wardId = searchCriteria.filters.wardId;

    if (searchCriteria.filters && searchCriteria.filters.teamId != null)
      query.teamId = searchCriteria.filters.teamId;

    options = Object.assign(options || {}, { where: query });
    return this.fetchAll(options);
  }

  update(data, where) {
    if (data.changed && data.changed() && data.changed().includes('is_discharged'))
      data.discharge_date = data.is_discharged ? new Date() : null;

    return super.update(data, where);
  }
}

module.exports = Patient;
