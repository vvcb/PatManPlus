const fs = require('fs');

module.exports = {
  getFile(f) {
    return new Promise((resolve) => {
      fs.readFile(f, (err, contents) => {
        resolve(contents.toString('utf8'));
      })
    });
  }
}