# File: Dockerfile.client

FROM node:20-alpine

WORKDIR /app

# Copy the whole monorepo
COPY . .

# Install all dependencies across workspaces
RUN yarn install

# Build the client
RUN yarn build

# Set working directory to client
WORKDIR /app/packages/client

# Expose Next.js port
EXPOSE 3000

CMD ["yarn", "start"]
