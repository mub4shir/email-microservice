// adapters/SMTPAdapter.ts
import nodemailer from "nodemailer";
import { EmailAdapter } from "./EmailAdapter";
import { SendArgs } from "../types/email";

export class SMTPAdapter implements EmailAdapter {
  async send({ from, to, cc, bcc, subject, html, text, config }: SendArgs) {
    const transporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.secure,
      auth: {
        user: config.smtp.auth.user,
        pass: config.smtp.auth.pass,
      },
    });

    const info = await transporter.sendMail({
      from,
      to,
      cc,
      bcc,
      subject,
      html,
      text,
    });

    return info.messageId;
  }
}
