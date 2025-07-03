FROM node:20-alpine

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn build

WORKDIR /app/packages/server

EXPOSE 5000

CMD ["yarn", "start"]
