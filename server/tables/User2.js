const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.defineModel('user_2',{
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  weekday: Sequelize.INTEGER,
  start_time: Sequelize.INTEGER,
  dis_total: Sequelize.FLOAT,
  sem_O: Sequelize.TEXT,
  sem_D: Sequelize.TEXT,
  destination: Sequelize.TEXT,
  origin: Sequelize.TEXT,
  lngs: Sequelize.TEXT,
  lats: Sequelize.TEXT,
  travel_dis: Sequelize.TEXT,
  spd: Sequelize.TEXT,
  azimuth: Sequelize.TEXT,
  norm_dict: Sequelize.TEXT,
  key_point: Sequelize.TEXT,
  sem_pt: Sequelize.TEXT,
  time: Sequelize.DATE,
  line_id: Sequelize.INTEGER,
  o_eff: Sequelize.INTEGER,
  d_eff: Sequelize.INTEGER
});
