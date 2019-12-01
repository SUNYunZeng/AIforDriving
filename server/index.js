// node server
// use ES6

require('babel-register')({
  presets: ['env']
});

const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const searchAll = require('./api/searchAll');
const searchByRow = require('./api/searchByRow');
const searchByCol = require('./api/searchByCol');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// 允许跨域访问
app.all('*', function (req, res, next) {

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('X-Powered-By', ' 3.2.1');
  res.header('Content-Type', 'application/json;charset=utf-8');

  next();
});

app.use('/api/searchAll', searchAll);

app.use('/api/searchByRow', searchByRow);

app.use('/api/searchByCol', searchByCol);

app.get('/', (req, res, next) => res.send('Express Server'));
app.get('/api', (req, res, next) => res.send('API Pages'));

// 监听端口
app.listen(3000, () => console.log('success listen at port:3000......'));

