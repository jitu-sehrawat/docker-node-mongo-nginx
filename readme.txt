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

# Scale node app to 2 instances
10. docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --scale node-app=2




## Production
1. Make changes to prod.yml, for env variables from VM for node-app:
  `environment:
      - NODE_ENV=production
      - MONGO_USER=${MONGO_USER}  # Env variables from Vm on which this docker will run.
      - MONGO_PASSWORD=${MONGO_PASSWORD}
      - MONGO_IP=${MONGO_IP}
      - MONGO_PORT=${MONGO_PORT}
      - SESSION_SECRET=${SESSION_SECRET}`

2.Make changes to prod.yml, for env variables from VM for mongo:
 `mongo:
    environment:
      - MONGO_INITDB_ROOT_USERNAME=${MONGO_INITDB_ROOT_USERNAME}
      - MONGO_INITDB_ROOT_PASSWORD=${MONGO_INITDB_ROOT_PASSWORD}`

3. On VM, create .env file. Open .profile and write `set -o allexport; source /root/.env; set +o allexport;`.
   This will set the Env to VM. Use printenv to view all the variables.

4. Clone Git repo to /app on VM.

5. Push Image to dockerhub, first tag the image using:
  docker push jitusehrawat/docker-node-mongo-nginx_node-app

6. 




