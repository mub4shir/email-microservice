import "reflect-metadata"; // Required for tsyringe
import express from "express";
import { container } from "tsyringe";
import { errorHandler } from "./middlewares/errorHandler";
import { EmailController } from "./controllers/emailController";
import emailRoutes from "./routes/emailRoutes";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import emailTemplateRoutes from "./routes/emailTemplateRoutes";
import emailSettingRoutes from "./routes/emailSettingRoutes";
import emailScheduleRoutes from "./routes/emailScheduleRoutes";
import templateDocumentRoutes from "./routes/templateDocument";
import webhookRoutes from "./routes/webhookRoutes";
const app = express();

app.use(express.json());
app.use(cors());

app.use(morgan("dev"));

const emailController = container.resolve(EmailController);

// Load the Swagger YAML

const swaggerDocument = YAML.load(
  path.resolve(process.cwd(), "src/swagger/swagger.yaml")
);

// Mount Swagger UI at /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/templates", templateDocumentRoutes);
app.use("/api/email-schedules", emailScheduleRoutes);
app.use("/api/email-settings", emailSettingRoutes);
app.use("/api/email-templates", emailTemplateRoutes);
// Register routes
app.use("/api/email", emailRoutes(emailController));

app.use("/connector/ticketnetwork", webhookRoutes);

// Global error handling middleware
app.use(errorHandler);

export default app;
