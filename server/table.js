// scan all models defined in models:
const fs = require('fs');
const user1 = require('./tables/User1');
const user2 = require('./tables/User2');
const user3 = require('./tables/User3');
const user4 = require('./tables/User4');

module.exports = {
  'user1': user1,
  'user2': user2,
  'user3': user3,
  'user4': user4,
};


