FROM node:20-alpine

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile

WORKDIR /app/packages/shared

RUN yarn build
