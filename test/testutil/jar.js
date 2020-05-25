const cp = require('child_process');
const fs= require('fs');

const makeJar = (ctx, {version, name}) => {
  const jarDir = `${ctx.home}/jar`
  const jarPath = `${jarDir}/hello.jar`
  const command = `version=${version} name=${name} /scripts/makejar.sh ${jarPath}`

  if (!fs.existsSync(jarDir)) {
    fs.mkdirSync(jarDir);
  }
  cp.execSync(command);

  return {
    path: jarPath,
    dir: jarDir,
    name: 'hello.jar',
    version: version
  };
};

module.exports = {
  makeJar
}
