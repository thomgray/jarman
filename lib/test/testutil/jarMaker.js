const path = require('path');
const cp = require('child_process');
const fs = require('fs');
const fsp = require('../../src/util/fsplus');

function makeMain() {
    return `
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello world");
    }
}
`;
}

function makeMainPrinter(prints) {
    return `
public class Main {
    public static void main(String[] args) {
        System.out.println("${prints}");
    }
}
`;
}

function makeMainAnything(javacode) {
    return `
public class Main {
    public static void main(String[] args) {
        ${javacode}
    }
}
`;
}

function makeManifest(mf) {
    let version = mf.version || "1.0.0";
    let name = mf.name || "hello"

    return `Manifest-Version: 1.0
Implementation-Title: ${name}
Implementation-Version: ${version}
Specification-Vendor: example
Specification-Title: ${name}
Implementation-Vendor-Id: com.example
Specification-Version: ${version}
Main-Class: Main
Implementation-Vendor: example
`;
}

function makeJar(dest, manifest, mainclass) {
    let randomId = Math.random().toString(36).slice(2);
    let dir = "/tmp/jar-" + randomId;

    let mainPath = dir + "/Main.java";
    let manifestPath = dir + "/MANIFEST.MF";
    fs.mkdirSync(dir);
    fs.writeFileSync(manifestPath, manifest, { mode: 0o777 });
    fs.writeFileSync(mainPath, mainclass, { mode: 0o777 });
    
    cp.execSync(`javac Main.java`, {cwd: dir});
    cp.execSync(`jar -cfm thejar.jar MANIFEST.MF Main.class`, {cwd: dir});
    fs.copyFileSync(dir + "/thejar.jar", dest);
    fsp.rmDirRec(dir);
}

module.exports = {
    makeManifest,
    makeJar,
    makeMain,
    makeMainPrinter,
    makeMainAnything
}
