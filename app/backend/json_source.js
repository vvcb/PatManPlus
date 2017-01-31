const jsonfile = require('jsonfile');
const fs = require('fs');

class JsonSource {
  constructor(filename) {
    this.filename = filename;
    if (!fs.existsSync(filename)) {
      jsonfile.writeFileSync(filename, []);
    }
  }

  fetchAll() {
    return jsonfile.readFileSync(this.filename);
  }
}

module.exports = JsonSource;
