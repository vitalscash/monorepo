# Use Node.js 22 as the base image
FROM node:lts

# Set working directory
WORKDIR /app

# Copy repository files
COPY package.json ./
COPY yarn.lock ./
COPY .yarnrc.yml ./
COPY packages ./packages

ARG NODE_ENV
ARG RAILWAY_DEPLOYMENT_ID

# Enable Corepack and install dependencies
RUN corepack enable
RUN yarn install

RUN yarn run build

CMD ["yarn", "run", "indexer:start"]
