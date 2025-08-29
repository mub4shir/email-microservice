import { Request, Response } from "express";
import { sendTicketEmail } from "../services/emailService";
import { TicketDetails, EmailTemplateId } from "../types/Ticket";

export const ticketPaymentWebhook = async (req: Request, res: Response) => {
  try {
    const {
      id,
      name,
      ticketCount,
      email,
      event,
      date,
      location,
      section,
      row,
      total,
      paymentLink,
    } = req.query as {
      id?: EmailTemplateId;
      name?: string;
      ticketCount?: string;
      email?: string;
      event?: string;
      date?: string;
      location?: string;
      section?: string;
      row?: string;
      total?: string;
      paymentLink?: string;
    };

    if (!email) {
      return res
        .status(400)
        .json({ error: "Missing required query parameters" });
    }

    const ticketDetails: any = {
      eventName: event,
      date,
      location,
      section,
      row,
      quantity: ticketCount,
      total,
    };

    // ✅ Use `id` as templateId
    const chosenTemplate: EmailTemplateId = id ?? "ticket_confirmation";

    await sendTicketEmail(
      email,
      ticketDetails,
      chosenTemplate,
      "https://default-payment-link.com"
    );

    let voiceText: string | undefined;
    if (chosenTemplate === "ticket_confirmation") {
      voiceText = `Hello ${
        name ?? "Customer"
      }! Your ticket for ${event} on ${date} is confirmed.`;
    } else if (chosenTemplate === "payment_request") {
      voiceText = `Hello ${
        name ?? "Customer"
      }! Please complete payment for ${event} scheduled on ${date}.`;
    }

    return res.status(200).json({
      message: "Webhook processed successfully",
      templateUsed: chosenTemplate,
      voiceText,
      query: req.query,
    });
  } catch (err) {
    console.error("Webhook error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
