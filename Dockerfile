FROM node:16.15.1-alpine as base

WORKDIR /app

# copy packages to dir
COPY package.json .
COPY yarn.lock .
COPY prisma ./prisma/

COPY .env ./

# install dependencies
RUN yarn

RUN npx prisma generate

# bundle the code
COPY . .

# for production stage
FROM base as production

ENV NODE_PATH=./dist

# build
RUN yarn build