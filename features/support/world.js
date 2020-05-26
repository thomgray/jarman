const { setWorldConstructor, After, Before } = require("cucumber");
const cp = require('child_process');
const System = require('./systemInterface');
const Jarman = require('./jarmanInterface');

Before(function() {
    this.exec(`mkdir -p ${this.env.HOME}`);
});

After(function() {
    this.exec(`rm -rd ${this.env.HOME}`);
})

class CustomWorld {
    constructor() {
        this.env = {
            ... process.env,
            HOME:  '/tmp/cucumberhome'
        };

        this.jarman = './bin/index.js';
        this.commandHistory = [];

        this.Jarman = new Jarman(this);
        this.System = new System(this);

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
