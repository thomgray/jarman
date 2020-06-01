const assert = require('assert');
const processArgs = require('../src/args');

describe('arguments', function() {
    it('should parse positional arguments', function(){
        const args = processArgs(['this','that','the','other'])
    
        assert.equal('this', args.command);
        assert.deepEqual(['that', 'the', 'other'], args.positional);
        assert.deepEqual([], args.flags);
        assert.deepEqual({}, args.args);
    })

    it('should parse a -y/--yes flag', function() {
        const args = processArgs(['this','that','the','other', '-y']);
        assert(args.flags.includes('no-prompt'));

        const args2 = processArgs(['foo', '--yes']);
        assert(args2.flags.includes('no-prompt'));  
    })

    it('should parse any unknown flag', function(){
        const args = processArgs(['--bsflag','this', '--foo','-x'])
    
        assert.equal('this', args.command);
        assert.deepEqual([], args.positional);
        assert.deepEqual(['bsflag', 'foo', 'x'], args.flags);
        assert.deepEqual({}, args.args);
    })

    it('should expand known short-hand flags', function() {
        const args = processArgs(['-h'])
    
        assert.equal(undefined, args.command);
        assert.deepEqual([], args.positional);
        assert.deepEqual(['help'], args.flags);
        assert.deepEqual({}, args.args);
    });

    it('should map known arguments', function() {
        const args = processArgs(['--name', 'me', '--version', '1.0'])

        assert.equal(undefined, args.command);
        assert.deepEqual([], args.positional);
        assert.deepEqual(args.flags, []);
        assert.deepEqual(args.args, {name: 'me', version: '1.0'});
    });

    it('should parse a typical install argument', function(){
        const args = processArgs(['install', '--name', 'hello', '-v', 'LATEST', '/foo/bar/hello.jar', '--link']);

        assert.equal(args.command, 'install');
        assert.deepEqual(args.positional, ['/foo/bar/hello.jar']);
        assert.deepEqual(args.flags, ['link']);
        assert.deepEqual(args.args, {name: 'hello', version:'LATEST'});
    });
});