FROM node:14-alpine
RUN mkdir -p /usr/src/app
COPY ./* /usr/src/app/
WORKDIR /usr/src/app
RUN npm install
CMD node /usr/src/app/server.js
