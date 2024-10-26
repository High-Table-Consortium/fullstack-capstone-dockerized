FROM node:18-alpine

RUN mkdir -p /backend-app
WORKDIR /backend-app/
COPY package.json .
RUN npm install
WORKDIR /backend-app/server
COPY ./server ./server
CMD [ "node", "server/index.js" ]
