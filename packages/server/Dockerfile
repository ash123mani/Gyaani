FROM node:20-alpine

WORKDIR /app

COPY . .

RUN yarn install

WORKDIR /app/packages/shared
RUN yarn build

WORKDIR /app/packages/server
RUN yarn build

EXPOSE 5000

CMD ["yarn", "start:prod"]
