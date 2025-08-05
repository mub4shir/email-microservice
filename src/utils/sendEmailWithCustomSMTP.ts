// utils/sendEmailWithCustomSMTP.ts
import nodemailer from "nodemailer";

type SendOptions = {
  to: string;
  from: string;
  subject: string;
  html?: string;
  text?: string;
  smtp: {
    host: string;
    port: number;
    secure: boolean;
    auth: { user: string; pass: string };
  };
  attachments?: {
    filename: string;
    path: string;
    contentType: string;
  }[];
};

export async function sendEmailWithCustomSMTP(options: SendOptions) {
  const transporter = nodemailer.createTransport({
    host: options.smtp.host,
    port: options.smtp.port,
    secure: options.smtp.secure,
    auth: {
      user: options.smtp.auth.user,
      pass: options.smtp.auth.pass,
    },
  });

  await transporter.sendMail({
    from: options.from,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
    attachments: options.attachments,
  });
}
