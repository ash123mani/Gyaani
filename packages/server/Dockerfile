FROM node:20-alpine

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile

WORKDIR /app/packages/server

EXPOSE 3001

CMD ["yarn", "start:prod"]
