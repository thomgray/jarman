const fs = require('fs');
const path = require('path');
const system = require('../system');
const {BIN_DIR, VERSIONED_DIR} = system;

function use(args) {
  if (args.positional.length < 2) {
    console.error('incorrect use');
    process.exit(1);
  }

  const name = args.positional[0];
  const version = args.positional[1];

  const binPath = system.binPath(name);// path.join(BIN_DIR, name);
  const versionedPath = system.launcherPath(name, version);// path.join(VERSIONED_DIR, name, 'launcher', version);

  if (!fs.existsSync(versionedPath)) {
    console.error(`Cound not find version ${version} of application ${name}`);
    process.exit(1);
  }

  if (fs.existsSync(binPath)) {
    fs.unlinkSync(binPath);
  }
  fs.symlinkSync(versionedPath, binPath);
}

module.exports=use
