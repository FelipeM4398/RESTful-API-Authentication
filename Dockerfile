FROM node:latest
WORKDIR /usr/src/app
COPY . .
ENTRYPOINT [ "npm", "start" ]
