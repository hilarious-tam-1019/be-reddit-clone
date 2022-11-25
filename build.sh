#!/bin/bash

# running scripts to restart containers
docker-compose down && docker volume prune -f && docker image rm -f reddit-clone-server && docker-compose up -d  