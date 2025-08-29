// src/types/Ticket.ts
export type EmailTemplateId = "payment_request" | "ticket_confirmation";

export interface TicketDetails {
  eventName?: string;
  date?: string;
  location?: string;

  customerName?: string; // ?name
  quantity?: number | string; // ?count
  orderId?: string; // ?orderId

  // optional legacy
  section?: string | null;
  row?: string | number | null;
  total?: number | string;
  seat?: string | null;
}
