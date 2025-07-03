FROM node:20-alpine

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile

WORKDIR /app/packages/server

EXPOSE 5000

CMD ["yarn", "start:prod"]
