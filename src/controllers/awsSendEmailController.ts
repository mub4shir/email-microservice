import { Request, Response } from "express";
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
