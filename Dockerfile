FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn install
EXPOSE 4000
CMD [ "node", "server.ts"]

