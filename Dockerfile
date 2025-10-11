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

# Copy repository files
COPY .gitattributes ./
COPY key ./key
COPY package.json ./
COPY yarn.lock ./
COPY packages ./packages

# Initialize git repository for git-crypt
RUN git init && \
    git config --global user.email "docker@build.local" && \
    git config --global user.name "Docker Build" && \
    git add . && \
    git commit -m "Initial commit for git-crypt"

# Decrypt files using git-crypt if key is provided
ARG GIT_CRYPT_KEY
RUN --mount=type=secret,id=git_crypt_key,target=/tmp/git_crypt_key \
    if [ -f "/tmp/git_crypt_key" ]; then \
      echo "Secret key provided, overriding local key file" && \
      cp /tmp/git_crypt_key ./key; \
    elif [ ! -z "${GIT_CRYPT_KEY+x}" ]; then \
      echo "Environment key provided, overriding local key file" && \
      echo "$GIT_CRYPT_KEY" | base64 -d > ./key 2>/dev/null; \
    fi && \
    if [ -f "./key" ]; then \
      echo "Unlocking git-crypt..." && \
      git-crypt unlock ./key && \
      rm ./key && \
      echo "Git-crypt unlock successful"; \
    else \
      echo "No key file found, skipping git-crypt unlock"; \
    fi

ARG ZKP2P_DOMAIN
ARG ZKP2P_API_KEY
ARG VITE_FORWARDER_URL
ARG VITE_INDEXER_URL
ARG VITE_REOWN_PROJECT_ID
ARG NODE_ENV
ARG VITE_SACRIFICE_URL
ARG RAILWAY_GIT_COMMIT_SHA

# Enable Corepack and install dependencies
RUN corepack enable
RUN yarn install

RUN yarn run build

CMD ["yarn", "run", "indexer:start"]
