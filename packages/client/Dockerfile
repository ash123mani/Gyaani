FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy everything into the container
COPY . .

# Install dependencies from monorepo
RUN yarn install --frozen-lockfile --ignore-scripts

# Go to client app directory
WORKDIR /app/client

# Build the client
RUN yarn build

# Expose frontend port (e.g., Next.js runs on 3000)
EXPOSE 3000

# Start the client app
CMD ["yarn", "start"]
