const assert = require('assert');
const fs = require('fs');
const { sandbox } = require('./testutil');
const jar = require('./testutil/jarMaker')

describe('install', function() {
    sandbox(function(ctx){
        const install = require('../src/commands/install').apply;

        function makeJar({name, version}) {
            const path = ctx.home + `${name}.jar`;
            const manifestStr = jar.makeManifest({ version, name });
            const main = jar.makeMain()
            jar.makeJar(path, manifestStr, main);

            return {
                name,
                version,
                path
            }
        }

        it('should install a jar with manifest version and name', () => {
            ctx.install();
            const jar = makeJar({ version: '1.2.3', name: 'hello' });
        
            const args = {
                args: {},
                flags: [],
                positional: [jar.path],
                command: 'install'
            };

            install(args)
            assert(fs.existsSync(`${ctx.home}/.jarman/versioned/hello/launcher/1.2.3`));
            assert(fs.existsSync(`${ctx.home}/.jarman/versioned/hello/jar/hello__1.2.3.jar`));
            assert(fs.existsSync(`${ctx.home}/.jarman/bin/hello`));
        });

        it('should install a jar with specified version and name', () => {
            ctx.install();
            const jar = makeJar({ version: '1.2.3', name: 'hello' });
            const args = {
                args: {'version': '1.5.0', 'name': 'helloworld'},
                flags: [],
                positional: [jar.path],
                command: 'install'
            };

            install(args)
            assert(fs.existsSync(`${ctx.home}/.jarman/versioned/helloworld/launcher/1.5.0`));
            assert(fs.existsSync(`${ctx.home}/.jarman/versioned/helloworld/jar/helloworld__1.5.0.jar`));
            assert(fs.existsSync(`${ctx.home}/.jarman/bin/helloworld`));
        })
    });
});
