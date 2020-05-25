const os = require('os');
const path = require('path');
const fs = require('fs');

const HOME_DIR = os.homedir();
const INSTALL_DIR = path.join(HOME_DIR, ".jarman");
const BIN_DIR = path.join(INSTALL_DIR, "bin");
const VERSIONED_DIR = path.join(INSTALL_DIR, "versioned");

const ensureDir = (dirpath) => {
  if (!fs.existsSync(dirpath)) {
    fs.mkdirSync(dirpath, 0777, true);
  }
};

const install = () => {
  ensureDir(INSTALL_DIR);
  ensureDir(BIN_DIR);
  ensureDir(VERSIONED_DIR);
}

const binPath = (name) => path.join(BIN_DIR, name);
const versionedDir = (name) => path.join(VERSIONED_DIR, name);
const launcherDir = (name) => path.join(VERSIONED_DIR, name, 'launcher');
const launcherPath = (name, version) => path.join(VERSIONED_DIR, name, 'launcher', version);
const jarPath = (name, jar) => path.join(VERSIONED_DIR, name, 'jar', jar);

const ensureVersionedDirs = (name) => {
  ensureDir(path.join(VERSIONED_DIR, name));
  ensureDir(path.join(VERSIONED_DIR, name, 'launcher'));
  ensureDir(path.join(VERSIONED_DIR, name, 'jar'));
}

module.exports = {
  HOME_DIR,
  INSTALL_DIR,
  BIN_DIR,
  VERSIONED_DIR,
  versionedDir,
  install,
  ensureDir,
  binPath,
  launcherPath,
  launcherDir,
  jarPath,
  ensureVersionedDirs
};
