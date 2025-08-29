import app from "./app";
import config from "./config/config";
import { logger } from "./utils/logger";
import { connectToDatabase } from "./config/database";
import { setupTemplateDocumentSchedulers } from "./cron/templateDispatcher";

const PORT = Number(config.port) || 9000;

async function startServer() {
  try {
    await connectToDatabase();
    console.log("📦 Starting template schedulers...");
    await setupTemplateDocumentSchedulers();
    console.log("✅ Template schedulers setup complete");
    // const server = app.listen(PORT, "0.0.0.0", () => {
    //   logger.info(`🚀 Server running on port ${PORT}`);
    // });

    const server = app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
    });

    // Graceful shutdown
    process.on("SIGINT", () => {
      logger.info("SIGINT received, shutting down server...");
      server.close(() => {
        logger.info("Server closed");
        process.exit(0);
      });
    });

    process.on("unhandledRejection", (reason) => {
      logger.error(`Unhandled Rejection: ${reason}`);
    });
  } catch (err) {
    logger.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}

startServer();
