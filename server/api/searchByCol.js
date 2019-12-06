const table = require('../table');
const express = require('express');
const router = express.Router();
const work = require('../py-script/worker');
import {jsonWrite} from '../func';

router.post('/', (req, res) => {
  let params = req.body;
  console.log(params);
  if (params.tableName === '' || params.id === '' || table[params.tableName] === undefined) {
    jsonWrite(res, undefined);
    return;
  }
  params.requireRes = params.requireRes === undefined ? false : params.requireRes;

  let user = table[params.tableName];

  (async () => {
    let traj = await user.findAll({
      where: {
        id: parseInt(params.id)
      }
    });

    if (params.requireRes) {
      work.listen(JSON.stringify(traj))
        .then(data => jsonWrite(res, {'traj': traj, 'res': data}))
        .catch(err => console.log(err.toString('utf8')));
    } else {
      jsonWrite(res, traj);
    }
  })();
});

module.exports = router;
