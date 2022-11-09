FROM node:16.15.1-alpine

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

EXPOSE 3000

CMD [ "yarn", "start:dev" ]
