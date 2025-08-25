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

import { TicketDetails } from "../types/Ticket";

export const sendTicketEmail = async (
  toEmail: string,
  ticket: TicketDetails
): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const htmlTemplate = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
    <h2 style="color: #333;">🎟 Your Ticket Confirmation</h2>
    <p>Dear Customer,</p>
    <p>Your ticket has been successfully booked. Here are the details:</p>
    <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 10px;">
      <p><strong>Event:</strong> ${ticket.eventName}</p>
      <p><strong>Date:</strong> ${ticket.date}</p>
      <p><strong>Location:</strong> ${ticket.location}</p>
      <p><strong>Seat:</strong> ${ticket.seat}</p>
    </div>
    <p style="margin-top: 20px;">Thank you for booking with us!</p>
    <footer style="font-size: 12px; color: #888; margin-top: 20px;">This is an automated email. Please do not reply.</footer>
  </div>
  `;

  await transporter.sendMail({
    from: `"Ticket Service" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Your Ticket is Confirmed!",
    html: htmlTemplate,
  });
};
