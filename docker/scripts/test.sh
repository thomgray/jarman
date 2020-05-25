#! /bin/sh

cd /jarman
npm install
./node_modules/.bin/mocha test
