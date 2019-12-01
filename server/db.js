const Sequelize = require('sequelize');
const config = require('./config-default');

let sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: config.dialect,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

let defineModel = function (name, attributes) {
  let attrs = {};
  for (let key in attributes) {
    let value = attributes[key];
    // if the value is the mainKey
    if (typeof value === 'object' && value['type']) {
      value.allowNull = value.allowNull || false;
      attrs[key] = value;
    } else {
      attrs[key] = {
        type: value,
        allowNull: false
      };
    }
  }
  return sequelize.define(name, attrs, {
    tableName: name,
    timestamps: false,
    freezeTableName: true
  });
};

let exp = {
  defineModel: defineModel
};


module.exports = exp;
