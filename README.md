#Building the image
docker build . -t itssidhu/my-api-app
  
# my-api-app
#Running the image
docker run -p 2100:8800 -d itssidhu/my-api-app

# Enter the container
$ docker exec -it <container id> /bin/bash

#calling the api app
curl -i localhost:2100
