#!/bin/bash

# provide arg to rm old image
# ex: ./run.sh 2
if [ $1 ] ; then
 docker rm repo_collector_1;
fi

# run it
docker run --name repo_collector_1 repo_collector ;

exit ;
