FROM node:20-alpine

WORKDIR /app

COPY . .

RUN yarn install

WORKDIR /app/packages/shared

RUN yarn build
