const jar = require('../../lib/test/testutil/jarMaker')
const fs = require('fs');
class System {
    constructor(world) {
        // this.bind(world);
        this.world = world;
        this.exec = world.exec;
    }

    makeJar({version, name}) {
        let mainStr = jar.makeMain();
        let manifestStr = jar.makeManifest({version, name});
        let jarDir = this._homePath('/jar');

        if (!fs.existsSync(jarDir)) {
            fs.mkdirSync(jarDir);
        }

        let jarPath = this._homePath('/jar/hello.jar');

        jar.makeJar(jarPath, manifestStr, mainStr);

        return {
            path: jarPath,
            version: version,
            name: name
        }
    }

    _homePath(relative) {
        return `${this.world.env.HOME}${relative}`;
    }
}

module.exports = System
