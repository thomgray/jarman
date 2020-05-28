const { Given, When, Then } = require("cucumber");
const { expect } = require("chai");
const { tableToObject } = require('../support/tables');

Given('a hello world jar file exists', function (dataTable) {
    const tableData = tableToObject(dataTable)
    let version = tableData.version || "1.0.0";
    let name = tableData.name || "hello";

    let jar = this.System.makeJar({
        name: name,
        version: version
    });
    this.stash.jar = jar;
});

Given('the current version of {string} is {string}', function (name, version) {
    this.Jarman.use({name, version});
});

When('I install the jar file', function () {
    this.Jarman.install({ path: this.stash.jar.path });
});

When('I get the current version of {string}', function (name) {
    const output = this.Jarman.which({ name })
    this.pushLog(output);
});

When('I list the managed versions of {string}', function (name) {
    let output = this.Jarman.list({ name: name });
    this.pushLog(output);
});

When('I install the jar file with commands', function (dataTable) {
    let commands = tableToObject(dataTable);
    let name = commands.name
    let version = commands.version
    this.Jarman.install({
        path: this.stash.jar.path,
        name: name,
        version: version
    });
});

When('I list manages applications', function () {
    let output = this.Jarman.list({});
    this.pushLog(output);
});

When('I use version {string} of {string}', function (version, name) {
    this.Jarman.use({name, version});
});

Then('the jar file is run', function () {
    expect(this.popLog()).to.eq("Hello world");
});

Then('the list includes versions', function (dataTable) {
    const expectedVersions = dataTable.raw().map((row) => row[0]);
    const versions = this.popLog().split('\n');

    expect(versions).to.deep.eq(expectedVersions);
});