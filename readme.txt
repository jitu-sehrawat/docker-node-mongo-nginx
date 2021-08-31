1. docker build -t node-app-image .

2. docker run -d
    -v $PWD:/app:ro
    -v /app/node_modules
    --env-file ./.env
    -p 3000:3000
    --name node-app
    node-app-image

    info:
    -v $PWD:/app:ro # bind mount, Read Only. Docker cannot create a file in HOST directory
    -v /app/node_modules  # anonymous volume. Prevent from deleting node_modules inside container
    --env-file ./.env # path of env File on HOST system. Here './' mean same as that of Dockerfile.
    -p 3000:3000  # Host to docker port mapping
    --name node-app # giving our conatiner name
    node-app-image  # Image used to run container

3. docker exex -it node-app bash

4. docker rm node-app -fv
  note:
  -f # forcefully remove the container
  -v # Remove the volume assoicated with this container. DONOT DO -v FOR DBs.

5. docker-compose up -d # creates a new image, spin up the container

6. docker-compose down -v # tear down the container. -v removes the volumes.

# DEV
7. docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
# PROD
8. docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

9. docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v