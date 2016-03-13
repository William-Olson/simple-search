#!/bin/bash

docker-compose kill ;

docker-compose build ;

docker-compose up -d;

exit ;