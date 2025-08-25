import { Request, Response } from "express";
import { sendTicketEmail } from "../services/emailService";

import { TicketDetails } from "../types/Ticket";

export const ticketBookedWebhook = async (req: Request, res: Response) => {
  try {
    const {
      userEmail,
      ticketDetails,
    }: { userEmail: string; ticketDetails: TicketDetails } = req.body;

    if (!userEmail || !ticketDetails) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await sendTicketEmail(userEmail, ticketDetails);

    const voiceText = `Hello! Your ticket for ${ticketDetails.eventName} on ${ticketDetails.date} is confirmed.`;

    return res.status(200).json({ message: "Webhook processed successfully" });
  } catch (err) {
    console.error("Webhook error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
