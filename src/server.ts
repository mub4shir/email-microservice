import app from "./app";
import config from "./config/config";
import { logger } from "./utils/logger";
import { connectToDatabase } from "./config/database";

const PORT = config.port || 9000;

async function startServer() {
  try {
    await connectToDatabase();
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
