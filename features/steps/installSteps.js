const { Given, When, Then } = require("cucumber");
const { expect } = require("chai");

Given('a jar file exists', function () {
    this.exec(`mkdir -p ${this.HOME}/jar`)
    this.exec(`version=1.0.0 /scripts/makejar.sh ${this.HOME}/jar/hello.jar`)
});

Given('jarman is initialised', function () {
    let jarmanPath = this.exec(`${this.jarman} --path`);
    this.env.PATH = `${this.env.PATH}:${jarmanPath}`;
});

Given('a hello world jar file exists', function (dataTable) {
    const tableData = dataTable.rowsHash();
    let version = tableData.version || "1.0.0";
    let name = tableData.name || "hello";

    this.exec(`version=${version} name=${name} /scripts/makejar.sh ${this.HOME}/jar/hello.jar`)
});

When('I install the jar file', function () {
    this.exec(`node ${this.jarman} install ${this.HOME}/jar/hello.jar`)
});

When('I execute the {string} command', function (cmd) {
    let output = this.exec(`${cmd}`);
    this.commandHistory.push(output);
});

When('I get the current versions of {string}', function (name) {
    const output = this.exec(`${this.jarman} which ${name}`)
    this.commandHistory.push(output);
});

When('I list the managed versions of {string}', function (name) {
    let output = this.exec(`${this.jarman} list ${name}`)
    this.commandHistory.push(output);
});

Then('the jar file is run', function () {
    expect(this.commandHistory.pop()).to.eq("Hello world");
});

Then('the list includes versions', function (dataTable) {
    const expectedVersions = dataTable.raw().map((row) => row[0]);
    const versions = this.commandHistory.pop().split('\n');

    expect(versions).to.deep.eq(expectedVersions);
});

Then('the output is {string}', function (output) {
    expect(this.commandHistory.pop()).to.eq(output);
});