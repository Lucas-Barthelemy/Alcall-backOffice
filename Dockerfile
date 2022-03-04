FROM node:17.6.0-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install pm2 -g
RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 80
CMD [ "pm2-runtime", "src/server.js" ]
