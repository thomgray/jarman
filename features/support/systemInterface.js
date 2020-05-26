class System {
    constructor(world) {
        // this.bind(world);
        this.world = world;
        this.exec = world.exec;
    }

    makeJar({version, name}) {
        let jarDir = this._homePath('/jar');
        let jarPath = this._homePath('/jar/hello.jar');

        this.exec(`mkdir -p $(dirname ${jarPath})`)
        this.exec(`version=${version} name=${name} /scripts/makejar.sh ${jarPath}`)

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
