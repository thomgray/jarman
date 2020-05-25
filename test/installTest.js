const assert = require('assert');
const fs = require('fs');
const { sandbox, makeJar } = require('./testutil');

describe('install', () => {
    sandbox((ctx) => {
        const install = require('../lib/commands/install');

        it('should install a jar with manifest version and name', () => {
            ctx.install();
            const jar = makeJar(ctx, { version: '1.2.3', name: 'hello' });
            const args = {
                args: {},
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
            const jar = makeJar(ctx, { version: '1.2.3', name: 'hello' });
            const args = {
                args: {'--version': '1.5.0', '--name': 'helloworld'},
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
