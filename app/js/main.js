function remoteRequire(module) {
  return require('electron').remote.require(module);
}