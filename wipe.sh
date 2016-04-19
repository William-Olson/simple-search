#!/bin/bash

# The below 2 lines are for strict-mode like behavior. 
# see: (http://redsymbol.net/articles/unofficial-bash-strict-mode/)
set -euo pipefail
IFS=$'\n\t'

# ex: ./wipe.sh 2
if [ $1 ] ; then
	docker-compose kill $1 ;
	docker-compose rm $1 ;
	docker rmi 'simplesearch_'$1 ;
	docker-compose up -d $1 ;
else
	echo 'Error:   Please provide a service to wipe.' ;
	echo 'Warning: (This script completely deletes images & containers)' ;
fi

exit ;