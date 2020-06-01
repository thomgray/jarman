const fs = require('fs');
const path = require('path');
const system = require('../system');
const readlineSync = require("readline-sync");

function uninstall(args) {
  if (args.positional.length == 1) {
    uninstallProgramWholesale(args.positional[0], args);
  } else if (args.positional.length > 1) {
    uninstallProgramVersion(args.positional[0], args.positional[1], args);
  } else {
    //something wrong
    simpleHelp();
    process.exit(1);
  }
}


function uninstallProgramWholesale(program, args) {
  const applicationPath = system.versionedDir(program);
  const binPath = system.binPath(program);

  if (fs.existsSync(applicationPath)) {
    const versionDir = system.launcherDir(program);
    let versions = [];
    if (fs.existsSync(versionDir)) {
      versions = fs.readdirSync(versionDir);
    }

    let proceed = getProceed({versions, program}, args);
    if (proceed) {
      if (fs.existsSync(binPath)) {
        fs.unlinkSync(binPath);
      }
      fs.rmdirSync(applicationPath, {recursive: true});
    } else {
      console.log('coward')
    }
  } else {
    console.error(`${program} is not installed`);
  }
}

function getProceed({versions, program}, args) {
  if (args.flags.includes('no-prompt')) {
    return true;
  }

  let proceed = readlineSync.keyInYN(`Are you sure you want to uninstall ${versions.length} versions of '${program}'? `)
  return proceed;
}

function uninstallProgramVersion(program, version, args) {
  const versionedPath = system.launcherPath(program, version);
  const jarPath = system.jarPath(program, version);

  if (fs.existsSync(versionedPath)) {
    fs.unlinkSync(versionedPath);
  }
  if (fs.existsSync(jarPath)) {
    fs.unlinkSync(jarPath);
  }
}

function printHelp() {
  simpleHelp();
}

function simpleHelp() {
  console.log(`Basic Usage:

  $ jarman uninstall <name> <version>?`);
}

module.exports = {
  apply: uninstall,
  help: printHelp,
  simpleHelp: simpleHelp
};