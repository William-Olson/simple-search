#!/bin/bash

docker rm -f ss_nginx_1 ;


docker run --name ss_nginx_1 -p 80:80 -d ss_nginx ;


exit ;
