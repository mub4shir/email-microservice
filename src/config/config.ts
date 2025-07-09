import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT || 9000,
  smtp: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  ses: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  },
  emailFrom: process.env.EMAIL_FROM,
  secretKey: process.env.SECRET_KEY,
};

export default config;
