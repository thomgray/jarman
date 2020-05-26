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
    help();
    process.exit(1);
  }
}

function help() {
  console.log(`Usage:

jarman uninstall <name> <version>?
`)
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
    // const rl = readlineSync.createInterface({
    //     input: process.stdin,
    //     output: process.stdout
    // });
    let proceed = readlineSync.keyInYN(`Are you sure you want to uninstall ${versions.length} versions of '${program}'? `)
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

function uninstallProgramVersion(program, version, args) {
  const versionedPath = system.launcherPath(program, version);
  if (fs.existsSync(versionedPath)) {
    fs.unlinkSync(versionedPath);
  }
}

module.exports = uninstall
