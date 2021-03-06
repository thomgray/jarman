const fs = require('fs');
const path = require('path');
const cp = require("child_process");
const { rmDirRec } = require('./util/fsplus');

// jar tf path-to-jar to list contents
// jar tvf path-to-jar to list contents verbose

// jar xf extracts files (perhaps to tmp and rm afterwards if neesd be)

// tmp dir; / mkdir /tmp/jarmanjartmp
// pushd: / pushd /tmp/jarmanjartmp
// extract META-INF/MANIFEST.MF - jar xf <jar> META-INF/MANIFEST.MF
// get info from manifest
// popd
// rm -dr /tmp/jarmanjartmp

// example
/**
Manifest-Version: 1.0
Implementation-Title: hello
Implementation-Version: 0.1.0-SNAPSHOT
Specification-Vendor: example
Specification-Title: hello
Implementation-Vendor-Id: com.example
Specification-Version: 0.1.0-SNAPSHOT
Main-Class: com.gray.hello.Main
Implementation-Vendor: example
**/

const readManifest = (path) => {
  let contents = fs.readFileSync(path, 'utf8');
  let lines = contents.split(/\r?\n/);
  const mf = {};
  while (lines.length) {
    line = lines.pop().split(':');
    if (line.length == 2) {
      mf[line[0].trim()] = line[1].trim();
    }
  }
  return mf;
}

const getManifest = (jarpath) => {
  const tmpdir = '/tmp/jarmantmp'
  const command = `cd ${tmpdir} && jar -xf ${jarpath} META-INF/MANIFEST.MF`;

  if (!fs.existsSync(tmpdir)) {
    fs.mkdirSync(tmpdir)
  }

  cp.execSync(command);

  const manifestPath = path.join(tmpdir, 'META-INF/MANIFEST.MF');
  const contents = readManifest(manifestPath);
  rmDirRec(tmpdir);
  return contents;
};

const nameFromManifest = (mf) => {
  return mf['Implementation-Title'];
}

const versionFromManifest = (mf) => {
  return mf['Implementation-Version'];
}

module.exports = {
  getManifest,
  versionFromManifest,
  nameFromManifest
};
