const libs = {
  fs: require('fs'),
  os: require('os'),
  path: require('path'),
  writer: require('../writer'),
  jartool: require('../jartool')
};
const system = require('../system');

function install(args) {
  // sanity check args first?
  let relPath = args.positional[args.positional.length-1] //should be last
  let version = args.args['--version']
  let name = args.args['--name']
  const linkOnly = args.args.hasOwnProperty('--link');

  let absPath = libs.path.resolve(relPath)
  if (!libs.fs.existsSync(absPath)) {
    // complain that there is no jar file there!
    return
  }

  return libs.jartool.getManifest(absPath).then((manifest) => {
    if (!name) {
      name = libs.jartool.nameFromManifest(manifest);
    }
    if (!version) {
      version = libs.jartool.versionFromManifest(manifest);
    }

    if (!version) {
      version = 'latest';
    }
    if (!name) {
      console.log('could not infer name from manifest, please provide one explicitly')
      throw new Error('Oh no!');
    }

    console.log(absPath)
    console.log(`version: ${version}`)
    console.log(`name:    ${name}`)

    system.ensureVersionedDirs(name);
    const jarPath = system.jarPath(name, `${name}__${version}.jar`);
    const launcherPath = system.launcherPath(name, version);

    const binPath = system.binPath(name);
    const exeJarPath = linkOnly ? absPath : jarPath
    const launcherTxt = libs.writer.launcherStub(exeJarPath);

    if (!linkOnly) {
      libs.fs.copyFileSync(absPath, jarPath)
    }

    libs.fs.writeFileSync(launcherPath, launcherTxt, {mode: 0o777})
    if (libs.fs.existsSync(binPath)) {
      libs.fs.unlinkSync(binPath);
    }
    libs.fs.symlinkSync(launcherPath, binPath);
  });
};

module.exports = install;
