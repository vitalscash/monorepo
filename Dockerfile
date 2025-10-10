# Use Node.js 22 as the base image
FROM node:lts

# Install git-crypt dependencies and build from source
RUN apt-get update && \
    apt-get install -y git build-essential libssl-dev && \
    cd /tmp && \
    git clone https://github.com/AGWA/git-crypt.git && \
    cd git-crypt && \
    make && \
    make install && \
    cd / && \
    rm -rf /tmp/git-crypt && \
    apt-get remove -y build-essential && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy git files and repository structure
COPY .git ./.git
COPY .gitattributes ./
COPY package*.json ./
COPY yarn.lock ./
COPY packages ./packages

# Decrypt files using git-crypt if key is provided
ARG GIT_CRYPT_KEY
RUN if [ -n "$GIT_CRYPT_KEY" ]; then \
      echo "$GIT_CRYPT_KEY" | base64 -d > ./key && \
      git config --global user.email "docker@build.local" && \
      git config --global user.name "Docker Build" && \
      git add . && \
      git commit -m "Docker build state" || true && \
      git-crypt unlock ./key && \
      rm ./key; \
    fi

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
