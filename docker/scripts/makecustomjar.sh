#! /bin/bash

export name=${name}
export version=${version}
export source_dir=${custom}
export dest=$1

/bin/bash $(dirname "$0")/_makejar.sh
