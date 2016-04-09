#!/bin/bash

# provide arg to rm old image
# ex: ./run.sh 2
if [ $1 ] ; then
 docker rm ss_data_1;
fi

# run it
docker run --name ss_data_1 ss_data ;

exit ;
