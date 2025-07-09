// ecosystem.config.js
module.exports = {
    apps: [
      {
        name: "email-services",
        script: "./dist/src/server.js",
        interpreter: "node",
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: "1G",
        env: {
          NODE_ENV: "development",
          PORT: 9000,
        },
        env_production: {
          NODE_ENV: "production",
          PORT: 9000,
        },
      },
    ],
  };