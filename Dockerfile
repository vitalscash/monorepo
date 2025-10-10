# Use Node.js 22 as the base image
FROM node:lts

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY yarn.lock ./
COPY packages ./packages

ARG ZKP2P_DOMAIN
ARG ZKP2P_API_KEY
ARG VITE_FORWARDER_URL
ARG VITE_INDEXER_URL
ARG VITE_REOWN_PROJECT_ID
ARG NODE_ENV
ARG VITE_SACRIFICE_URL
ARG RAILWAY_GIT_COMMIT_SHA

# Install dependencies
RUN yarn
RUN yarn run build

CMD ["yarn", "run", "indexer:start"]
