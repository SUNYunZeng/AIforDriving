const table = require('../table');
const express = require('express');
const router = express.Router();
import {jsonWrite} from '../func';


router.post('/', (req, res) => {
  let params = req.body;
  console.log(params);
  if (params.tableName === '' || params.rowName === '' || table[params.tableName] === undefined) {
    jsonWrite(res, undefined);
    return;
  }

  let user = table[params.tableName];

  (async () => {
    let traj = await user.findAll({
      attributes: [params.rowName]
    });
    jsonWrite(res, traj);
  })();
});

module.exports = router;

