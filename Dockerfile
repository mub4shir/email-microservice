# Use an official Node.js runtime (version 18.20.4) as the base image
FROM node:18.20.4

# Set the working directory
WORKDIR /emailServicesBackend

# Copy package.json and package-lock.json
COPY package*.json ./

# Remove node_modules and package-lock.json if they exist (from previous builds)
RUN rm -rf node_modules package-lock.json

# Install dependencies
RUN npm install

# Copy the rest of the application code, including app.ts
COPY . .

# Build the TypeScript code
RUN npm run build

# Install PM2 globally
RUN npm install pm2 -g

# Expose the port the app runs on
EXPOSE 7074

# Start the app with PM2
CMD ["pm2-runtime", "start", "ecosystem.config.js", "--env", "production"]