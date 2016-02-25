var rc = require('rc');

module.exports = rc('relax', {
  port: 8282,
  devPort: 8383,
  db: {
    uri: 'mongodb://localhost/yuanzi'
  }
});
