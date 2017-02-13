const fs = require('fs');
const chai = require('chai');
const sinon = require('sinon');
const Settings = require('../../app/backend/settings.js');

chai.should();

let app, settings;
const filePath = '~/.config/PatManPlus/settings.conf';

describe('settings', () => {
  beforeEach(() => {
    app = { getPath: () => {} };
    sinon.stub(app, 'getPath', () => '~/.config');
    settings = new Settings(app);
  });

  describe('#path', () => {
    it('returns expected location of config file', () => {
      settings.path.should.eql(filePath);
    });
  });

  describe('#parse', () => {
    afterEach(() => {
      fs.readFile.restore();
    });

    it('parses config file', () => {
      sinon.stub(fs, 'readFile').withArgs(filePath, 'utf8').callsArgWith(2, null, '{}');

      return settings.parse().then((obj) => {
        obj.should.eql({});
      });
    });

    it('throws error if file can not be read', () => {
      sinon.stub(fs, 'readFile').withArgs(filePath, 'utf8').callsArgWith(2, new Error('file not found'), '{}');

      return new Promise((resolve) => {
        settings.parse().catch((err) => {
          err.message.should.eql('Could not read config file: file not found');
          resolve();
        });
      });
    });

    it('throws error if json is invalid', () => {
      sinon.stub(fs, 'readFile').withArgs(filePath, 'utf8').callsArgWith(2, null, '{');

      return new Promise((resolve) => {
        settings.parse().catch((err) => {
          err.message.should.eql('Config file failed to parse: Unexpected end of JSON input');
          resolve();
        });
      });
    });
  });

  describe('#load', () => {
    const dbFilePath = '/tmp/dbfile.sqlite';
    const sharedFolder = '/tmp';

    beforeEach(() => {
      sinon.stub(settings, 'parse').returns(Promise.resolve({ dbFilePath: dbFilePath }));
    });

    afterEach(() => {
      fs.stat.restore();
      if (fs.writeFile.restore) fs.writeFile.restore();
    });

    it('checks for valid dbfilePath', () => {
      const mockStat = { isFile: () => { return true; }, isDirectory: () => { return false; }};
      sinon.stub(fs, 'stat').withArgs(dbFilePath).callsArgWith(1, null, mockStat);

      return settings.load().then((settings) => {
        settings.should.not.be.null;
        settings.dbFilePath.should.eql(dbFilePath);
        settings.sharedFolder.should.eql(sharedFolder);
      });
    });

    it('prompts for dbFilePath if it does not exist', () => {
      const mockStat = { isFile: () => { return false; }, isDirectory: () => { return false; }};
      sinon.stub(fs, 'stat').withArgs(dbFilePath).callsArgWith(1, null, mockStat);

      const dialogExpectation = sinon.stub(settings, 'showDbFilePicker').returns(Promise.resolve([dbFilePath]));

      const expectedContent = JSON.stringify({ dbFilePath: dbFilePath });
      const fileWriteExpectation = sinon.stub(fs, 'writeFile')
                                        .withArgs(filePath, expectedContent).callsArgWith(2, null);

      return settings.load().then((settings) => {
        settings.should.not.be.null;
        settings.dbFilePath.should.eql(dbFilePath);
        settings.sharedFolder.should.eql(sharedFolder);
        dialogExpectation.called.should.be.true;
        fileWriteExpectation.called.should.be.true;
      });
    });
  });
});
