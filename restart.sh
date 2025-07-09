#!/bin/bash

# Stop PM2
pm2 stop all

# Compile TypeScript
npx tsc

# Start PM2
pm2 start ecosystem.config.js --env production