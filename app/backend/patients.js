const Repository = require('./repository');
const Patient = require('./db_models/patient');

class Patients extends Repository {
  constructor(database) {
    super(database, Patient);
  }

  search (searchCriteria) {
    searchCriteria = searchCriteria || {};

    const query = {};

    if (searchCriteria.name != null)
      query.name = { $like: `%${searchCriteria.name}%`};

    if (searchCriteria.uid != null)
      query.uid = { $like: `%${searchCriteria.uid}%`};

    if (searchCriteria.is_discharged != null)
      query.is_discharged = searchCriteria.is_discharged;

    if (searchCriteria.filters && searchCriteria.filters.consultant != null)
      query.consultant = searchCriteria.filters.consultant;

    if (searchCriteria.filters && searchCriteria.filters.ward != null)
      query.ward = searchCriteria.filters.ward;

    if (searchCriteria.filters && searchCriteria.filters.team != null)
      query.team = searchCriteria.filters.team;

    return this.database.runLockingSqliteCommand(() => {
      return this.dbModel.findAll({ where: query });
    });
  }
}

module.exports = Patients;
