FROM node:20-alpine

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile

RUN yarn workspace @qj/server build

WORKDIR /app/packages/server

EXPOSE 5000

CMD ["yarn", "start"]
