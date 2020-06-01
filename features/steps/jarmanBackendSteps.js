const { Given, When, Then } = require("cucumber");
const { expect } = require("chai");
const fs = require('fs');

Then('no launcher exists for version {string} of {string}', function (version, name) {
    expect(this.JarmanBE.launcherExists({name, version})).to.be.false;
});

Then('no jar is cached for version {string} of {string}', function (version, name) {
    expect(this.JarmanBE.jarExists({name, version})).to.be.false;
});

Then('a launcher exists for version {string} of {string}', function (version, name) {
    expect(this.JarmanBE.launcherExists({name, version})).to.be.true;
});

Then('a jar is cached for version {string} of {string}', function (version, name) {
    expect(this.JarmanBE.jarExists({name, version})).to.be.true;
});

Then('there is a {string} executable bin linked to version {string}', function(name, version) {
    const binPath = this.JarmanBE.binPath({name});
    const expectedLinkPath = this.JarmanBE.launcherPath({name, version});

    expect(fs.existsSync(binPath)).to.be.true;
    let link = fs.readlinkSync(binPath);
    expect(link).to.eq(expectedLinkPath);
});

Then('there is no {string} executable', function(name) {
    const binPath = this.JarmanBE.binPath({name});

    expect(fs.existsSync(binPath)).to.be.false;
});

Then('no versions exist of {string}', function (name) {
    let versionPath = this.JarmanBE.versionPath({name})
    expect(fs.existsSync(versionPath)).to.be.false;
});