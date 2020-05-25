const { setWorldConstructor } = require("cucumber");
const cp = require('child_process');

class CustomWorld {
    constructor() {
        this.env = {
            ... process.env,
            HOME:  '/tmp/cucumberhome'
        };

        this.HOME = '/tmp/cucumberhome';
        this.jarman = './bin/index.js';
        this.commandHistory = [];
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
}

setWorldConstructor(CustomWorld);
