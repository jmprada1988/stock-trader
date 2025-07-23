#!/bin/sh

# Check if the /app directory is empty and initialize it
if [ ! "$(ls -A /app)" ]; then
  echo "Initializing /app directory"
  cp -R /app-init/* /app/
fi

# Load environment variables if .env exists
if [ -f "/app/.env" ]; then
  echo "Loading environment variables from .env file"
  export $(grep -v '^#' /app/.env | xargs)
fi

# Execute the provided command
exec "$@"
