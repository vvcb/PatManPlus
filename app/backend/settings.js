const { dialog } = require('electron');
const fs = require('fs');
const path = require('path');
const logger = require('./logger');

class ConfigError extends Error {

}

class Settings {
  constructor(app) {
    this.app = app;
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
      return this.showDbFilePicker().then((dbFilePath) => this.writeConfigFile(dbFilePath[0]));
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

  showDbFilePicker() {
    return new Promise((resolve) => {
      const messageBoxSettings = {
        type: 'warning',
        buttons: ['Ok'],
        title: 'Missing configuration',
        message: 'Configuration file is missing. Press Ok to configure'
      };

      dialog.showMessageBox(messageBoxSettings, () => {
        const filePickerSettings = { properties: ['openFile'] };

        dialog.showOpenDialog(filePickerSettings, (filePaths) => {
          resolve(filePaths);
        });
      });
    });
  }

  setFilePaths(dbFilePath) {
    this.dbFilePath = dbFilePath;
  }
}

module.exports = Settings;
