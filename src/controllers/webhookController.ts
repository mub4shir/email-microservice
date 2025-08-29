import { Request, Response } from "express";
import { sendTicketEmail } from "../services/emailService";
import { TicketDetails, EmailTemplateId } from "../types/Ticket";

export const ticketBookedWebhook = async (req: Request, res: Response) => {
  try {
    const {
      userEmail,
      ticketDetails,
      templateId,
      paymentLink,
    }: {
      userEmail: string;
      ticketDetails: TicketDetails;
      templateId?: EmailTemplateId;
      paymentLink?: string;
    } = req.body;

    if (!userEmail || !ticketDetails) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Default to "ticket_confirmation" template if not provided
    const chosenTemplate: EmailTemplateId = templateId ?? "ticket_confirmation";

    // Send email with selected template
    await sendTicketEmail(
      userEmail,
      ticketDetails,
      chosenTemplate,
      paymentLink ?? ""
    );

    // Only build voice text for confirmation type
    let voiceText: string | undefined;
    if (chosenTemplate === "ticket_confirmation") {
      voiceText = `Hello! Your ticket for ${ticketDetails.eventName} on ${ticketDetails.date} is confirmed.`;
    } else if (chosenTemplate === "payment_request") {
      voiceText = `Hello! Please complete payment for ${ticketDetails.eventName} scheduled on ${ticketDetails.date}.`;
    }

    return res.status(200).json({
      message: "Webhook processed successfully",
      templateUsed: chosenTemplate,
      voiceText,
    });
  } catch (err) {
    console.error("Webhook error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
