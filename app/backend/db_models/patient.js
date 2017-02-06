module.exports = function(sequelize, DataTypes) {
  return sequelize.define('patients', {
    uid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dob: {
      type: DataTypes.DATE,
    },
    ward: {
      type: DataTypes.STRING,
    },
    bed: {
      type: DataTypes.STRING,
    },
    team: {
      type: DataTypes.STRING,
    },
    consultant: {
      type: DataTypes.STRING,
    },
    adm_date: {
      type: DataTypes.DATE,
    },
    dis_date: {
      type: DataTypes.DATE,
    },
    is_discharged: {
      type: DataTypes.BOOLEAN,
    },
    problem: {
      type: DataTypes.STRING,
    },
    details: {
      type: DataTypes.STRING,
    },
    past_medical_history: {
      type: DataTypes.STRING,
    },
    tests: {
      type: DataTypes.STRING,
    },
    jobs: {
      type: DataTypes.STRING,
    },
    treatment: {
      type: DataTypes.STRING,
    },
    treatment_date: {
      type: DataTypes.DATE,
    },
    adverse_events: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'patients'
  });
};