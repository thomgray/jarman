const { setWorldConstructor, After, Before } = require("cucumber");
const cp = require('child_process');
const System = require('./systemInterface');
const Jarman = require('./jarmanInterface');
const JarmanBackend = require('./jarmanBackend');

Before(function () {
    this.exec(`mkdir -p ${this.env.HOME}`);
});

Before({ tags: "@todo" }, function () {
    return 'skipped'
});

// Asynchronous Callback
// Before(function (testCase, callback) {
//     var world = this;
//     tmp.dir({unsafeCleanup: true}, function(error, dir) {
//       if (error) {
//         callback(error);
//       } else {
//         world.tmpDir = dir;
//         callback();
//       }
//     });
//   });


After(function (scenario) {
    if (scenario.result.status === 'failed') {
        console.log(this.log);
        console.log(this.Jarman.log)
        console.log(cp.execSync(`find ${this.JarmanBE.jarmanDir}`, { encoding: 'utf8' }));
    }
    this.exec(`rm -rd ${this.env.HOME}`);
})


class CustomWorld {
    constructor() {
        this.env = {
            ...process.env,
            HOME: '/tmp/cucumberhome'
        };

        this.jarman = './bin/index.js';
        this.commandHistory = [];

        this.Jarman = new Jarman(this);
        this.System = new System(this);
        this.JarmanBE = new JarmanBackend(this);

        this.stash = {};

        this.log = [];
    }

    setEnv(key, value) {
        this.env[key] = value;
    }

    exec(cmd) {
        return cp.execSync(cmd, {
            env: this.env,
            encoding: 'utf-8'
        }).trim();
    }

    pushLog(s) {
        this.log.push(s);
    }

    popLog() {
        return this.log.pop();
    }
}

setWorldConstructor(CustomWorld);
