class Jarman {
    constructor(world) {
        this.world = world;
        this.jarmanCmd = './bin/index.js'
    }

    initialize() {
        let jarmanPath = this.world.exec(`${this.jarmanCmd} --path`);
        this.world.setEnv('PATH', `${this.world.env.PATH}:${jarmanPath}`);

        this.log = []
    }

    install({ path, name, version }) {
        let args = "";
        if (name) {
            args += ` --name ${name}`
        }
        if (version) {
            args += ` --version ${version}`
        }
        const cmd = `${this.jarmanCmd} install ${path} ${args}`;

        return this.__handleCommand(cmd);
    }

    list({ name }) {
        const cmd = `${this.jarmanCmd} list ${name ? name : ''}`;
        return this.__handleCommand(cmd);
    }

    which({ name }) {
        const cmd = `${this.jarmanCmd} which ${name}`;
        return this.__handleCommand(cmd);
    }

    __handleCommand(cmd) {
        const result = {
            cmd: cmd,
            stdout: null,
            stderr: null,
            status: 0
        }

        try {
            let out = this.world.exec(cmd)
            result.stdout = out;
        } catch (error) {
            result.status = error.status;
            result.stderr = error.stderr;
            result.stdout = error.stdout;
        }
        this.log.push(result);
        return result.stdout;
    }
}

module.exports = Jarman
