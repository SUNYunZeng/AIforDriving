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
  search_params['time'] = params.time===undefined?{[Op.lt]: new Date()}:
    {[Op.lt]: new Date(params.time[1]),[Op.gt]:new Date(params.time[0])};
  let user = table[params.tableName];

  (async () => {
    let traj = await user.findAll({
      where: search_params
    });
    jsonWrite(res, traj);
  })();
});

module.exports = router;
