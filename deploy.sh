#!/bin/bash

# Set your Git credentials
GIT_USERNAME="catosaurusrex2003"
GIT_PASSWORD="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" # Use your personal access token here

# Build the client
cd server
npm run build

# Go back to the root directory
cd ..

# Configure Git with your credentials
git config --global credential.helper "store --file ~/.git-credentials"
git config --global user.name "$GIT_USERNAME"
git config --global user.email "your-email@example.com" # Use your email associated with Git

# Store the Git credentials
echo "https://$GIT_USERNAME:$GIT_PASSWORD@github.com" > ~/.git-credentials

# Commit and push to GitHub
git add .
git commit -m "Deploy project"
git push origin main

