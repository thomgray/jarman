const assert = require('assert');
const fs = require('fs');
const {sandbox} = require('./testutil');

describe('system', function() {
  sandbox(function(ctx) {
    const system = require('../src/system');

    console.log("home = " + ctx.home);
    console.log(system.HOME_DIR);
    
    it('HOME should be correct', () => {
      assert.equal(ctx.home, system.HOME_DIR)
    });
    it('INSTALL_DIR should be correct', () => {
      assert.equal(`${ctx.home}/.jarman`, system.INSTALL_DIR);
    });
    it('BIN_DIR should be correct', () => {
      assert.equal(`${ctx.home}/.jarman/bin`, system.BIN_DIR);
    });
    it('VERSIONED_DIR should be correct', () => {
      assert.equal(`${ctx.home}/.jarman/versioned`, system.VERSIONED_DIR);
    });
    it('versionedDir should be correct', () => {
      assert.equal(`${ctx.home}/.jarman/versioned/foo`, system.versionedDir('foo'));
    });
    it('binPath should be correct', () => {
      assert.equal(`${ctx.home}/.jarman/bin/foo`, system.binPath('foo'));
    });
    it('launcherDir should be correct', () => {
      assert.equal(`${ctx.home}/.jarman/versioned/foo/launcher`, system.launcherDir('foo'));
    });
    it('launcherPath should be correct', () => {
      assert.equal(`${ctx.home}/.jarman/versioned/foo/launcher/1.0`, system.launcherPath('foo', '1.0'));
    });
    it('launcherPath should be correct', () => {
      assert.equal(`${ctx.home}/.jarman/versioned/foo/jar/foo.jar`, system.jarPath('foo', 'foo.jar'));
    });

    describe('install', () => {
      it('should create required directories', () => {
        assert(!fs.existsSync(`${ctx.home}/.jarman/bin`));
        assert(!fs.existsSync(`${ctx.home}/.jarman/versioned`));
        system.install();
        assert(fs.existsSync(`${ctx.home}/.jarman/bin`));
        assert(fs.existsSync(`${ctx.home}/.jarman/versioned`));
      });

      it('should succeed if required directories already exist', () => {
        fs.mkdirSync(`${ctx.home}/.jarman`);
        fs.mkdirSync(`${ctx.home}/.jarman/bin`);
        fs.mkdirSync(`${ctx.home}/.jarman/versioned`);
        system.install();
        assert(fs.existsSync(`${ctx.home}/.jarman/bin`));
        assert(fs.existsSync(`${ctx.home}/.jarman/versioned`));
      });
    });

    describe('ensureVersionedDirs', () => {
      it('should create version dir', () => {
        system.install();
        assert(!fs.existsSync(`${ctx.home}/.jarman/versioned/hello`));
        system.ensureVersionedDirs('hello');
        assert(fs.existsSync(`${ctx.home}/.jarman/versioned/hello`));
        assert(fs.existsSync(`${ctx.home}/.jarman/versioned/hello/jar`));
        assert(fs.existsSync(`${ctx.home}/.jarman/versioned/hello/launcher`));
      });
    });
  });
});
