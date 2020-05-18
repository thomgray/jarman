const path = require('path');
const system = require('./system');

const launcherStub = (jarPath) => {
  return `#! /usr/bin/env bash
# this lancher is created and managed by jarman

java -jar ${jarPath} "$@"
`
}

module.exports = {
  launcherStub
};
