const fs = require('fs');
const path = require('path');
const {VERSIONED_DIR, BIN_DIR} = require('../system');

function list(args) {
  if (args.positional.length) {
    jar = args.positional[0]
    listVersions(jar, args)
  } else {
    listExecutables(args)
  }
}

function listExecutables(args) {
  let bins = fs.readdirSync(BIN_DIR)
  print(bins)
}

function listVersions(name, args) {
  let versions = []
  let versionDir = path.join(VERSIONED_DIR, name, 'launcher');
  if (fs.existsSync(versionDir)) {
    versions = fs.readdirSync(versionDir)
  }

  print(versions);
}

const print = (things) => {
  for (var i = 0; i < things.length; i++) {
    console.log(things[i]);
  };
};

function printHelp() {
  simpleHelp();
}

function simpleHelp() {
  console.log(`Basic Usage:

  $ jarman list <name>?`);
}
module.exports = {
  apply: list,
  help: printHelp,
  simpleHelp: simpleHelp
};
