FROM node:20-alpine

WORKDIR /app

RUN yarn install --frozen-lockfile

COPY . .

WORKDIR /app/packages/shared

RUN yarn build
