const fs = require('fs');
const Path = require('path');
const fsPlus = require('../../lib/util/fsplus')

function sandbox(f) {
  const home = '/tmp/testhome'
  process.env.HOME = home

  if (process.env.TEST_ENV !== 'DOCKER') {
    console.warn('This should be run in docker!')
  }

  beforeEach(() => {
    if (!fs.existsSync(home)) {
      fs.mkdirSync(home);
    }
  });

  afterEach(() => {
    fsPlus.rmDirRec(home);
  });

  const context = {
    home: home,
    install: () => {
      fs.mkdirSync(`${home}/.jarman`);
      fs.mkdirSync(`${home}/.jarman/bin`);
      fs.mkdirSync(`${home}/.jarman/versioned`);
    },
    rmdirRecursive: fsPlus.rmDirRec
  };
  f(context);
}

module.exports = sandbox
