FROM node:20-alpine

WORKDIR /app

# Copy entire monorepo
COPY . .

# Install dependencies (adjust if using yarn workspaces or turbo)
RUN yarn install --frozen-lockfile

# Build frontend and backend (optional if you want prebuild)
RUN yarn workspace build

# Install concurrently to run both apps
RUN yarn global add concurrently

# Expose ports for both client and server
EXPOSE 3000 3001

# Run both apps in parallel
CMD ["concurrently", "yarn workspace @qj/server start:prod", "yarn workspace @qj/client start"]
