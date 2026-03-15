#!/bin/bash

SERVICE=$1

if [ -z "$SERVICE" ]; then
    echo "./dev-build.sh [service]"
    exit 1
fi

echo "--- Build JAR: $SERVICE ---"

mvn clean package -pl $SERVICE -am -DskipTests

if [ $? -ne 0 ]; then
    echo "Build JAR Error!"
    exit 1
fi

echo "--- Restarting container: $SERVICE ---"

docker compose -f docker-compose.yml -f docker-compose.dev.yml restart $SERVICE

echo "--- Log $SERVICE: ---"
docker compose -f docker-compose.yml -f docker-compose.dev.yml logs -f --tail 50 $SERVICE

