#!/bin/bash

# Completly remove all image instances and rebuilding the docker env
docker-compose rm -f && docker-compose pull && docker-compose up --build -d