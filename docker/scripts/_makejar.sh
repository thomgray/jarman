#! /bin/bash

MANIFEST="Manifest-Version: 1.0
Implementation-Title: ${name}
Implementation-Version: ${version}
Specification-Vendor: example
Specification-Title: ${name}
Implementation-Vendor-Id: com.example
Specification-Version: ${version}
Main-Class: Main
Implementation-Vendor: example
"

dir="/tmp/jar-$RANDOM"
mkdir -p $dir
cp /resources/$source_dir/Main.java $dir/Main.java
pushd $dir
javac Main.java
echo "$MANIFEST" > MANIFEST.MF
jar -cfm $name.jar MANIFEST.MF Main.class
popd
mv $dir/$name.jar $dest
rm -rd $dir
