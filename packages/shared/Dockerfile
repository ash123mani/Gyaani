FROM node:20-alpine

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile

ENV PATH="./node_modules/.bin:$PATH"

WORKDIR /app/packages/shared

RUN ls -la /app/node_modules/.bin/tsc

RUN yarn build
