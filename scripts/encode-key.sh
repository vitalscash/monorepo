#!/bin/bash

# Script to encode the git-crypt key file as base64 for use as an environment variable
# Usage: ./scripts/encode-key.sh [key-file-path]

# Default key file path
KEY_FILE="${1:-./key}"

# Check if key file exists
if [ ! -f "$KEY_FILE" ]; then
    echo "Error: Key file '$KEY_FILE' not found!" >&2
    echo "Usage: $0 [key-file-path]" >&2
    echo "Example: $0 ./key" >&2
    exit 1
fi

# Check if key file is readable
if [ ! -r "$KEY_FILE" ]; then
    echo "Error: Key file '$KEY_FILE' is not readable!" >&2
    exit 1
fi

# Encode the key file as base64
echo "Encoding key file: $KEY_FILE"
echo "Base64 encoded key (copy this for GIT_CRYPT_KEY environment variable):"
echo ""
base64 < "$KEY_FILE"
echo ""
echo "Usage in Docker build:"
echo "docker build --build-arg GIT_CRYPT_KEY=\$(./scripts/encode-key.sh) ."
echo ""
echo "Usage in environment:"
echo "export GIT_CRYPT_KEY=\$(./scripts/encode-key.sh)"
