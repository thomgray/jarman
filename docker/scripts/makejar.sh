#! /bin/bash

export version=${version}
export name="hello"
export source_dir="helloworld"
export dest=$1

/bin/bash $(dirname "$0")/_makejar.sh
