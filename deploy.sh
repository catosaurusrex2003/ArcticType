#!/bin/bash

# Read Git credentials from environment variables
GIT_USERNAME="$GIT_USERNAME"
GIT_PASSWORD="$GIT_PASSWORD"
GIT_EMAIL="$GIT_EMAIL"

# Build the server
cd server
npm run build

# Go back to the root directory
cd ..

# Configure Git with your credentials
git config --global credential.helper "store --file ~/.git-credentials"
git config --global user.name "$GIT_USERNAME"
git config --global user.email "$GIT_EMAIL" # Use your email associated with Git

# Store the Git credentials
echo "https://$GIT_USERNAME:$GIT_PASSWORD@github.com" > ~/.git-credentials

TIMESTAMP=$(date +"%I:%M%p %B %d")

# Commit and push to GitHub
git add .
git commit -m "Deploy project $TIMESTAMP"
git push origin main


