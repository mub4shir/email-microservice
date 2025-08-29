// src/controllers/webhookController.ts
import { Request, Response } from "express";
import { sendTicketEmail } from "../services/emailService";
import { TicketDetails, EmailTemplateId } from "../types/Ticket";

const SERVER_PAYMENT_LINK = "https://payments.radicalminds.in/checkout/default";

export const ticketPaymentWebhook = async (req: Request, res: Response) => {
  try {
    const {
      id, // templateId
      name, // customer name
      count, // ticket count
      email, // recipient
      event, // event name
      date, // event date
      location, // event location
      orderId, // order id
    } = req.query as {
      id?: EmailTemplateId;
      name?: string;
      count?: string;
      email?: string;
      event?: string;
      date?: string;
      location?: string;
      orderId?: string;
    };

    if (!email) return res.status(400).json({ error: "Missing email" });

    const ticketDetails: TicketDetails = {
      customerName: name,
      eventName: event,
      date,
      location,
      quantity: count,
      orderId,
    };

    const chosenTemplate: EmailTemplateId = id ?? "payment_request";

    // DEBUG (remove later)
    console.log("[DEBUG query]", req.query);
    console.log("[DEBUG mapped]", ticketDetails);
    console.log("[DEBUG templateId]", chosenTemplate);

    await sendTicketEmail(
      email,
      ticketDetails,
      chosenTemplate,
      SERVER_PAYMENT_LINK
    );

    return res.status(200).json({
      ok: true,
      templateUsed: chosenTemplate,
      usedPaymentLink: SERVER_PAYMENT_LINK,
      echoedQuery: req.query,
    });
  } catch (err) {
    console.error("Webhook error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const ticketConfirmedWebhook = async (req: Request, res: Response) => {
  try {
    const {
      name, // customer name
      count, // ticket count
      email, // recipient
      event, // event name
      date, // event date
      location, // event location
      orderId, // order id
    } = req.query as {
      name?: string;
      count?: string;
      email?: string;
      event?: string;
      date?: string;
      location?: string;
      orderId?: string;
    };

    if (!email) {
      return res
        .status(400)
        .json({ error: "Missing required query parameter: email" });
    }

    // Map query → TicketDetails used by the confirmation template
    const ticket: TicketDetails = {
      customerName: name,
      eventName: event,
      date,
      location,
      quantity: count,
      orderId,
    };

    // Always use confirmation template; subject is fixed in emailService
    await sendTicketEmail(email, ticket, "ticket_confirmation", "");

    return res.status(200).json({
      ok: true,
      templateUsed: "ticket_confirmation",
      echoedQuery: req.query,
    });
  } catch (err) {
    console.error("ticketConfirmedWebhook error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
