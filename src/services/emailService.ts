import { injectable } from "tsyringe";
import nodemailer from "nodemailer";
import config from "../config/config";
import { logger } from "../utils/logger";

@injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: false,
      auth: {
        user: config.smtp.user,
        pass: config.smtp.pass,
      },
    });
  }

  async sendEmail(
    to: string,
    subject: string,
    text: string,
    html?: string
  ): Promise<void> {
    try {
      const info = await this.transporter.sendMail({
        from: '"Your App" <no-reply@yourapp.com>',
        to,
        subject,
        text,
        html,
      });
      logger.info(`Email sent: ${info.messageId}`);
    } catch (error) {
      logger.error(`Failed to send email: ${error}`);
      throw new Error("Failed to send email");
    }
  }
}

import { SendEmailCommand } from "@aws-sdk/client-ses";
import sesClient from "../config/awsSES";

export const sendEmail = async (to: string, subject: string, body: string) => {
  try {
    const params = {
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Body: {
          Text: { Data: body },
        },
        Subject: { Data: subject },
      },
      Source: process.env.EMAIL_FROM!, // Use the verified email address
    };

    const command = new SendEmailCommand(params);
    const response = await sesClient.send(command);

    console.log(`Email sent to ${to}: ${response.MessageId}`);
    return response.MessageId;
  } catch (error) {
    console.error(`Error sending email: ${error}`);
    throw new Error(`Error sending email: ${error}`);
  }
};

import { emailTemplates } from "./emailTemplates";
import { TicketDetails, EmailTemplateId } from "../types/Ticket";

const SUBJECT_PAYMENT = "TicketNetwork: Payment for your next Show !";
const SUBJECT_CONFIRM = "TicketNetwork: Show Confirmed !"; // ✅ fixed per your ask

export const sendTicketEmail = async (
  toEmail: string,
  ticket: TicketDetails,
  templateId: EmailTemplateId = "ticket_confirmation",
  paymentLink: string = ""
): Promise<void> => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST!,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_PORT === "465",
    auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! },
  });

  const subject =
    templateId === "payment_request" ? SUBJECT_PAYMENT : SUBJECT_CONFIRM; // ✅

  const templateFn =
    emailTemplates[templateId] ?? emailTemplates["ticket_confirmation"];
  const html = templateFn(ticket, paymentLink);

  await transporter.sendMail({
    from: `"Ticket Service" <${process.env.SMTP_USER}>`,
    to: toEmail,
    subject,
    html,
  });
};
