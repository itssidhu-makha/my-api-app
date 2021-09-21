FROM node:14
WORKDIR /test/automation/itssidhu
COPY package*.json ./
RUN npm install
#To bundle your app's source code inside the Docker image
COPY . .
EXPOSE 8800
CMD ["node","server.js"]
