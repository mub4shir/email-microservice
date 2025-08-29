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

    // ✅ apply constants only if missing/empty
    const ticketDetails: TicketDetails = {
      customerName: name && name.trim() !== "" ? name : "Customer",
      eventName: event && event.trim() !== "" ? event : "Adele Concert",
      date: date && date.trim() !== "" ? date : "03-September-2025",
      location:
        location && location.trim() !== ""
          ? location
          : "United Center, 1901 W Madison St, Chicago, IL 60612",
      quantity: count && count.toString().trim() !== "" ? count : "2",
      orderId: orderId && orderId.trim() !== "" ? orderId : "7684956",

      // extra constants always set
      section: "Lower level",
      row: "Row 19, RD-27, 28",
      seat: "Seated together",
      total: "2 x $150 + $10 (some tax) = $310",
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

    // Apply query values if present; otherwise use constants (same as payment API)
    const ticket: TicketDetails = {
      customerName: name && name.trim() !== "" ? name : "Customer",
      eventName: event && event.trim() !== "" ? event : "Adele Concert",
      date: date && date.trim() !== "" ? date : "03-September-2025",
      location:
        location && location.trim() !== ""
          ? location
          : "United Center, 1901 W Madison St, Chicago, IL 60612",
      quantity: count && count.toString().trim() !== "" ? count : "2",
      orderId: orderId && orderId.trim() !== "" ? orderId : "7684956",

      // Same constant extras so the template renders these rows
      section: "Lower level",
      row: "Row 19, RD-27, 28",
      seat: "Seated together",
      total: "2 x $150 + $10 (some tax) = $310",
    };

    // Always use confirmation template; subject already fixed to "TicketNetwork: Show Confirmed !"
    await sendTicketEmail(email, ticket, "ticket_confirmation", "");

    // If you want silent response like payment, switch to: return res.status(200).end();
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
