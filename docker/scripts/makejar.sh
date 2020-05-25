#! /bin/bash

MANIFEST="Manifest-Version: 1.0
Implementation-Title: hello
Implementation-Version: ${version}
Specification-Vendor: example
Specification-Title: hello
Implementation-Vendor-Id: com.example
Specification-Version: ${version}
Main-Class: Main
Implementation-Vendor: example
"

mkdir -p /tmp/jar
cp /resources/helloworld/Main.java /tmp/jar/Main.java
pushd /tmp/jar
javac Main.java
echo "$MANIFEST" > MANIFEST.MF
jar -cfm hello.jar MANIFEST.MF Main.class
popd
mv /tmp/jar/hello.jar $1
rm -rd /tmp/jar
