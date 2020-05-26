const { Given, When, Then } = require("cucumber");
const { expect } = require("chai");

Given('a hello world jar is installed', function (dataTable) {
    const tableData = dataTable.rowsHash();
    const name = tableData.name || "hello";
    const version = tableData.version || "1.0.0";

    let jar = this.System.makeJar({
        name: name,
        version: version
    });

    this.stash.jar = jar;

    this.Jarman.install({
        path: jar.path
    });
});

Given('jarman is initialized', function () {
    this.Jarman.initialize();
});

When('I execute the {string} command', function (cmd) {
    let output = this.exec(`${cmd}`);
    this.pushLog(output);
});

Then('the command fails with status {int} and error {string}', function(status, msg) {
    let cmd = this.Jarman.log.pop();
    expect(cmd.status).to.eq(status);
    expect(cmd.stderr.trim()).to.eq(msg);
});

Then('the output is {string}', function (output) {
    expect(this.popLog()).to.eq(output);
});
