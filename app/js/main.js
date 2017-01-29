function remoteRequire(module) {
  return require('electron').remote.require(module);
}

var log = require('electron-log');
log.transports.console.level = 'debug';
log.appName = 'nhs-hack-day';

$(() => {
  	// example communication between main and render process
  const { getFile } = remoteRequire('./app/getFile');

  const backend = remoteRequire('./app/backend/app');;
  backend.initialize('/tmp/nhs-hack-day/attempt_1')
  log.info(backend);


  var files = [
    '111_212_2341.json',
    '111_222_1231.json',
    '111_222_3333.json',
    '111_333_1234.json',
    '132_232_1231.json',
    '133_343_6684.json',
    '999_888_1111.json',
    '999_888_2222.json',
    '999_888_3333.json',
    '999_888_4444.json',
    '999_888_5555.json',
    '999_888_6666.json',
    '999_888_7777.json',
    'john_doe.json'
  ];



  Promise.all(files.map((f) => getFile(`./fixtures/${f}`))).then((contents) => {
    const patientData = contents.map((c) => JSON.parse(c)).map((p) => p.patient);
    var app7 = new Vue({
      el: '#app',
      data: {
        patients: patientData
      }
    });
  });
});
