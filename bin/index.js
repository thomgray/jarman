#!/usr/bin/env node

const libs = {
  fs: require('fs'),
  os: require('os'),
  path: require('path'),
  writer: require('../lib/writer'),
  jartool: require('../lib/jartool')
};

const system = require('../lib/system');
const commands = require('../lib/commands');

const processArgs = () => {
  const args = process.argv.slice(2).reverse();

  const parsed = {
    args: {},
    positional: [],
    command: undefined
  }

  let arg;
  while (args.length) {
    arg = args.pop();

    if (arg.startsWith('-')) {
      let value = args.pop()
      parsed.args[arg] = value;
    } else if (!parsed.command) {
      parsed.command = arg;
    } else {
      parsed.positional.push(arg);
    }

  }
  return parsed;
};


function help(args) {
  console.log("so you need help eh?")
}

function simpleHelp(args) {
  console.log("you don't know what you're doing do you?")
}

function noCommand(args) {
  if (args.args.hasOwnProperty('--path')) {
    console.log(system.BIN_DIR);
    return true;
  } else if (args.hasOwnProperty('--version') || args.hasOwnProperty('-v')) {
    console.log(require('../package.json').version);
    return true;
  }

  return false;
}

function main() {
  const args = processArgs();

  switch (args.command) {
    case 'version':
      const packageJson = require('../package.json');
      console.log(packageJson.version);
      break;
    case 'list':
      commands.list(args)
      break;
    case 'install':
      commands.install(args).catch((err) => {
        console.error(err);
        process.exit(1)
      });
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
