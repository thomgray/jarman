#!/usr/bin/env node

const libs = {
  fs: require('fs'),
  os: require('os'),
  path: require('path'),
  writer: require('../lib/src/writer'),
  jartool: require('../lib/src/jartool')
};

const packageJson = require('../package.json');
const system = require('../lib/src/system');
const commands = require('../lib/src/commands');
const processArgs = require('../lib/src/args');

function printHelp() {
  console.log(`Jarman v${packageJson.version}

  Usage:
  ──────
  
    $ jarman <command> [arguments]? [options]? [flags]?
  
  Commands:
  ─────────
  
  Below is a list of supported commands with placeholder arguments.
  A '?' after an agument indicates that it is optional.
  
  Refer to the detailed help page per argument for more information.
  
    $ jarman help
        : print this global help page.
        : refer to 'jarman help <command>' for help per command.
  
    $ jarman install <jar>
        : install a jar
  
    $ jarman list <name>?
        : list installed jars or installed versions of named jar
  
    $ jarman uninstall <name> <versionPattern>?
        : uninstall all named jars or specified versions
  
    $ jarman use <name> <version>
        : use specified version of named jar
  
    $ jarman version
        : print the current version
  
    $ jarman which <name>
        : output the current version of the named jar
  
  Available arguments:
  ────────────────────
  
  Command dependent, refer to 'jarman help <command>' for details.
  
  Available options:
  ──────────────────
  
  Requirements are command dependent, refer to 'jarman help <command>' for details.
  
  Available flags:
  ────────────────
  
    --no-prompt|--yes|-y
        : do not prompt for confirmation of commands
  
    refer to 'jarman help <command>' for details of valid flags per command.
  `);

}

function help(args) {
  if (args.positional.length) {
    const commandToHelp = args.positional[0];

    if (commands.hasOwnProperty(commandToHelp) && typeof commands[commandToHelp].help === 'function') {
      commands[commandToHelp].help();
    } else {
      simpleHelp();
    }
    return;
  }
  printHelp();
}

function simpleHelp(args) {
  console.log(`Basic Usage:

  $ jarman <command> [arguments]? [options]? [flags]?

For detailed help:

  $ jarman help

Detailed help per command

  $ jarman help <command>
`);
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
      console.log(packageJson.version);
      break;
    case 'list':
      commands.list.apply(args)
      break;
    case 'install':
      commands.install.apply(args);
      break;
    case 'uninstall':
      commands.uninstall.apply(args);
      break;
    case 'which':
      commands.which.apply(args);
      break;
    case 'use':
      commands.use.apply(args);
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
