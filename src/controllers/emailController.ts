import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "tsyringe";
import { EmailService } from "../services/emailService";
import { verifyToken } from "./auth"; // Import verifyToken function

@injectable()
export class EmailController {
  constructor(@inject(EmailService) private emailService: EmailService) {}

  async sendEmail(req: Request, res: Response, next: NextFunction) {
    const { to, subject, text, html } = req.body;

    // Extract Bearer token from Authorization header
    const token = req.headers.authorization?.split(" ")[1];

    // Check if token exists
    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }

    // Verify the token
    const verified = verifyToken(token);
    console.log("verified", verified);
    if (!verified) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    try {
      // If token is valid, proceed to send email
      // await this.emailService.sendEmail(to, subject, text, html);
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      next(error);
    }
  }
}

import { sendEmail } from "../services/emailService";

export const sendEmailController = async (req: Request, res: Response) => {
  const { to, subject, body } = req.body;

  try {
    const messageId = await sendEmail(to, subject, body);
    res.status(200).json({ messageId });
  } catch (error) {
    if (error instanceof Error) {
      // Type narrowing to access error.message
      res.status(500).json({ error: error.message });
    } else {
      // If it's not an Error object, provide a fallback message
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};
