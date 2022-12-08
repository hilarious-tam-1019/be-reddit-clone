#!/bin/bash

# completly remove all image instances and rebuilding the docker env
docker-compose down && docker volume prune -f &&
docker rmi -f $(docker images -a -q) &&
docker-compose pull -q && docker-compose up --build -d