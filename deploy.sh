#!/bin/bash

# Build the client
cd server
npm run build

# Go back to the root directory
cd ..

# Commit and push to GitHub
git add .
git commit -m "Deploy project"
git push origin main

