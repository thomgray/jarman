const system = require('../system');
const fs = require('fs');
const path = require('path');
const {BIN_DIR} = system;

function which(args){
  if (!args.positional.length) {
    console.log('you need help')
    process.exit(1);
  }

  const command = args.positional[args.positional.length-1]
  const binPath = path.join(BIN_DIR, command);

  console.log(binPath)
  if (!fs.existsSync(binPath)) {
    // no executable with that name
    console.log(`No executable found with the name '${command}'`);
    process.exit(1);
  }

  const original = fs.readlinkSync(binPath)
  const version = path.basename(original);
  //console.log(`${command} is currently linked to version ${version} @ ${binPath}`);
  console.log(version);
}

module.exports = which
