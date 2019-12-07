const express = require('express');
const router = express.Router();
const work = require('../py-script/worker');
import {jsonWrite} from '../func';

router.post('/', (req, res) => {
  let params = req.body;
  if (params.record === '' || params.record === undefined) {
    jsonWrite(res, undefined);
    return;
  }
  work.listen(JSON.stringify([params.record]))
    .then(data => jsonWrite(res, {'res': data}))
    .catch(err => console.log(err.toString('utf8')));
});

module.exports = router;
