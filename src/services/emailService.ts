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

// src/services/emailService.ts

import { emailTemplates } from "./emailTemplates";
import { TicketDetails, EmailTemplateId } from "../types/Ticket";

export const sendTicketEmail = async (
  toEmail: string,
  ticket: TicketDetails,
  templateId: EmailTemplateId = "ticket_confirmation",
  paymentLink: string = ""
): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Subject per template
  const subjects: Record<EmailTemplateId, string> = {
    ticket_confirmation: `🎟 Your Ticket for ${ticket.eventName} is Confirmed`,
    payment_request: `💳 Complete Payment for ${ticket.eventName}`,
  };
  const subject = subjects[templateId] ?? "Your Ticket Update";

  // Choose template (with safe fallback)
  const templateFn =
    emailTemplates[templateId] ?? emailTemplates["ticket_confirmation"];

  // Warn if payment template missing a link (but still send)
  if (templateId === "payment_request" && !paymentLink) {
    console.warn(
      "[emailService] payment_request template used without paymentLink."
    );
  }

  const htmlTemplate = templateFn(ticket, paymentLink);

  await transporter.sendMail({
    from: `"Ticket Service" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject,
    html: htmlTemplate,
  });
};
