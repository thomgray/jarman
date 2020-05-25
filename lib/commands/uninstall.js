const fs = require('fs');
const path = require('path');
const system = require('../system');
const readline = require("readline");

function uninstall(args) {
  if (args.positional.length == 1) {
    uninstallProgramWholesale(args.positional[0], args);
  } else if (args.positional.length > 1) {
    uninstallProgramVersion(args.positional[0], args.positional[1], args);
  } else {
    //something wrong
    console.error("That's not right - you need help");
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
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question(`Are you sure you want to uninstall ${versions.length} versions of '${program}'? (y/N) `, function(answer) {
      answer = answer.trim().toLowerCase();
      if (answer === 'y') {
        if (fs.existsSync(binPath)) {
          fs.unlinkSync(binPath);
        }
        fs.rmdirSync(applicationPath, {recursive: true});
      } else {
        console.log('coward')
      }
      rl.close();
    });
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
