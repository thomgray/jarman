const path = require('path');
const fs = require('fs');

class JarmanBackend {
    constructor(world) {
        this.world = world;
        this.jarmanDir = path.join(world.env.HOME, ".jarman");
    }

    jarExists({ name, version }) {
        const jarPath = path.join(this.jarmanDir, 'versioned', name, 'jar', `${name}__${version}.jar`);
        return fs.existsSync(jarPath);
    }

    launcherPath({ name, version }) {
        return path.join(this.jarmanDir, 'versioned', name, 'launcher', version);
    }

    launcherExists({ name, version }) {
        return fs.existsSync(this.launcherPath({name, version}));
    }

    binExists({ name }) {
        return fs.existsSync(this.binPath(name));
    }

    binPath({ name }) {
        return path.join(this.jarmanDir, 'bin', name);
    }

    versionPath({name}) {
        return path.join(this.jarmanDir, 'versioned', name);
    }
}

module.exports = JarmanBackend;
