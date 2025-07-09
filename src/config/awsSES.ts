import dotenv from "dotenv";
import { SESClient } from "@aws-sdk/client-ses";

// Load environment variables from .env file
dotenv.config();

// Configure the SES Client
const sesClient = new SESClient({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export default sesClient;
