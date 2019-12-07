const table = require('../table');
const express = require('express');
const Sequelize = require('sequelize');
const router = express.Router();
const Op = Sequelize.Op;
import {jsonWrite} from '../func';

router.post('/', (req, res) => {
  let params = req.body;

  if (params.tableName === '' || params.id === '' || table[params.tableName] === undefined) {
    jsonWrite(res, undefined);
    return;
  }
  console.log(params.id);
  let search_params;
  if (typeof params.id !== 'number') {
    search_params = {
      id: {
        [Op.or]: params.id
      }
    };
  }else{
    search_params = {
      id: parseInt(params.id)
    }
  }

  console.log(search_params);

  let user = table[params.tableName];

  (async () => {
    let traj = await user.findAll({
      where: search_params
    });
    jsonWrite(res, traj);
  })();
});

module.exports = router;
