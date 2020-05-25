#!/usr/bin/env node

const libs = {
  fs: require('fs'),
  os: require('os'),
  path: require('path'),
  writer: require('../lib/src/writer'),
  jartool: require('../lib/src/jartool')
};

const system = require('../lib/src/system');
const commands = require('../lib/src/commands');
const processArgs = require('../lib/src/args');

function help(args) {
  console.log("so you need help eh?")
}

function simpleHelp(args) {
  console.log("you don't know what you're doing do you?")
}

function noCommand(args) {
  if (args.flags.includes('path')) {
    console.log(system.BIN_DIR);
    return true;
  } else if (args.flags.includes('version')) {
    console.log(require('../package.json').version);
    return true;
  }

  return false;
}

function main() {
  const args = processArgs(process.argv.slice(2));

  switch (args.command) {
    case 'version':
      const packageJson = require('../package.json');
      console.log(packageJson.version);
      break;
    case 'list':
      commands.list(args)
      break;
    case 'install':
      commands.install(args);
      break;
    case 'uninstall':
      commands.uninstall(args);
      break;
    case 'which':
      commands.which(args);
      break;
    case 'use':
      commands.use(args);
      break;
    case 'help':
      help(args)
      break;
    default:
      let valid = noCommand(args);
      if (!valid) {
        simpleHelp(args)
      }
  }
}

system.install();
main();
