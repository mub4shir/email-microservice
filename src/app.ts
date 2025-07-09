import "reflect-metadata"; // Required for tsyringe
import express from "express";
import { container } from "tsyringe";
import { errorHandler } from "./middlewares/errorHandler";
import { EmailController } from "./controllers/emailController";
import emailRoutes from "./routes/emailRoutes";
import morgan from "morgan";
const app = express();
app.use(express.json());

app.use(morgan("dev"));

const emailController = container.resolve(EmailController);

// Register routes
app.use("/api/email", emailRoutes(emailController));

// Global error handling middleware
app.use(errorHandler);

export default app;
