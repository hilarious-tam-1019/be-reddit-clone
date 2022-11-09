FROM node:16.15.1-alpine

WORKDIR /usr/src/app

# copy packages to dir
COPY package*.json yarn.lock ./

# install dependencies
RUN yarn && yarn cache clean
RUN yarn build

# bundle the code
COPY . .

# expose port
EXPOSE 3000

CMD [ "yarn", "start" ]
