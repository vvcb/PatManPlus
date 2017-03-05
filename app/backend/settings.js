const fs = require('fs');
const path = require('path');
const logger = require('./logger');
const Database = require('./database');

class ConfigError extends Error { }

class Settings {
  constructor(app, mainPresenter) {
    this.app = app;
    this.mainPresenter = mainPresenter;
  }

  get path() {
    return path.join(this.app.getPath('appData'), 'PatManPlus', 'settings.conf');
  }

  load() {
    return this.parse().then((settingsContent) => {
      return new Promise((resolve, reject) => {
        fs.stat(settingsContent.dbFilePath, (err, stat) => {
          if (stat && stat.isFile() && !stat.isDirectory()) {
            logger.debug(`Database file exists: '${settingsContent.dbFilePath}'`);
            this.setFilePaths(settingsContent.dbFilePath);
            resolve(this);
          }
          else
            reject(new ConfigError(`dbFilePath is invalid: ${settingsContent.dbFilePath}`));
        });
      });
    }).catch((err) => {
      if (!(err instanceof ConfigError))
        throw err;

      logger.debug(err);
      return this.showDbFilePicker(true).then((dbFilePath) => this.writeConfigFile(dbFilePath));
    });
  }

  parse() {
    return new Promise((resolve, reject) => {
      logger.debug(`Reading config file from '${this.path}'`);
      fs.readFile(this.path, 'utf8', (err, contents) => {
        if (err)
          reject(new ConfigError(`Could not read config file: ${err.message}`));

        try {
          resolve(JSON.parse(contents));
        } catch (err) {
          reject(new ConfigError(`Config file failed to parse: ${err.message}`));
        }
      });
    });
  }

  writeConfigFile(dbFilePath) {
    return new Promise((resolve, reject) => {
      logger.debug(`Database file selected at '${dbFilePath}'`);
      const content = JSON.stringify({ dbFilePath: dbFilePath });
      fs.writeFile(this.path, content, (err) => {
        if (err)
          reject(new ConfigError(`Could not write to config file: ${this.path}`));
        else {
          this.setFilePaths(dbFilePath);
          resolve(this);
        }
      });
    });
  }

  showDbFilePicker(showError) {
    let startingPoint = Promise.resolve();

    if (showError) {
      const messageBoxSettings = {
        type: 'warning',
        buttons: ['Ok'],
        title: 'Missing configuration',
        message: 'Database file is missing or invalid. Press Ok to configure.'
      };

      startingPoint = startingPoint.then(() =>  this.mainPresenter.showMessageDialog(messageBoxSettings));
    }

    return startingPoint.then(() => {
      const filePickerSettings = {
        properties: ['openFile'],
        filters: [
          { name: 'SQLite DB Files', extensions: ['sqlite3'] },
          { name: 'All Files', extensions: ['*'] }
        ]
      };
      return this.mainPresenter.showOpenDialog(filePickerSettings);
    }).then((filePaths) => {
      const database = new Database(filePaths[0]);
      return database.connect().then(() => {
        return database.close();
      }).then(() => {
        return filePaths[0];
      }).catch((err) => {
        logger.error(err);
        return this.showDbFilePicker(true);
      });
    });
  }



  setFilePaths(dbFilePath) {
    this.dbFilePath = dbFilePath;
  }
}

module.exports = Settings;
