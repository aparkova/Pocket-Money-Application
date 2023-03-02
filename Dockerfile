# pull official base image
FROM node:14-alpine
ENV NODE_VERSION=14.16.1

# set working directory
WORKDIR /app

# Install app dependencies
COPY package.json .
RUN npm install -g truffle
RUN npm install -g ganache-cli
RUN npm install

# add app
COPY . .
EXPOSE 3000

# start app
CMD [ "npm", "start" ]
