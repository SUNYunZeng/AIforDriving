const table = require('../table');
const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
import {jsonWrite} from '../func';


router.post('/', (req, res) => {
  let params = req.body;
  console.log(params);
  if (params.tableName === '' || params.rowName === '' || table[params.tableName] === undefined) {
    jsonWrite(res, undefined);
    return;
  }

  const Op = Sequelize.Op;

  let user = table[params.tableName];

  let search_params = params.time===''||params.time===undefined?{
    time: {
      [Op.lt]: new Date()
    }
  }:{
    time: {
      [Op.gt]: new Date(params.time[0]),
      [Op.lt]: new Date(params.time[1])
    }
  };

  (async () => {
    let traj = await user.findAll({
      attributes: [...params.rowName],
      where: search_params
    });
    jsonWrite(res, traj);
  })();
});

module.exports = router;

