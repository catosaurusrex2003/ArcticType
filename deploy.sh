#!/bin/bash

# Read Git credentials from environment variables
GIT_USERNAME="$GIT_USERNAME"
GIT_PASSWORD="$GIT_PASSWORD"

# Build the client
cd server
npm run build

# Go back to the root directory
cd ..

# Configure Git with your credentials
git config --global credential.helper "store --file ~/.git-credentials"
git config --global user.name catosaurusrex2003
git config --global user.email mohdmehdi2003@gmail.com # Use your email associated with Git

# Store the Git credentials
echo "https://$GIT_USERNAME:$GIT_PASSWORD@github.com" > ~/.git-credentials

# Commit and push to GitHub
git add .
git commit -m "Deploy project"
git push origin main

