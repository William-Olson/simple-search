#!/bin/bash

# provide arg to rm old image
# ex: ./run.sh 1
if [ $1 ] ; then
 docker rm ss_elastic_1;
fi

# run it
docker run --name ss_elastic_1 ss_elastic ;


exit ;