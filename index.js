var fs = require('fs');

if (isDir(__dirname + '/lib')) {
   module.exports = require('./lib');
} else {
   module.exports = require('./src');
}

function isDir(p) {
  try {
    return fs.statSync(p).isDirectory();
  } catch (e) {
    return false;
  }
}

