FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

COPY  tsconfig.json ./
COPY  nodemon.json ./
COPY  src ./src
COPY  tsoa.json ./


RUN yarn install && yarn add nodemon
EXPOSE 4000



CMD [ "node", "dev"]

