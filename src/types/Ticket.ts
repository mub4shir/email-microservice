// src/types/Ticket.ts

export type EmailTemplateId = "payment_request" | "ticket_confirmation";

export interface TicketDetails {
  /** Core fields (required) */
  eventName: string;
  /** ISO or human-readable date string, e.g. "2025-09-28" or "Friday, September 28, 2025" */
  date: string;
  location: string;

  /** Optional fields used by the payment template */
  section?: string | null; // e.g. "D27, D28"
  row?: string | number | null; // e.g. "3"
  quantity?: number | string; // e.g. 2 or "2 (seated together)"
  total?: number | string; // e.g. 239 or "$239 ($112 x 2 + $15 fee)"

  /** Back-compat with the confirmation template */
  seat?: string | null; // e.g. "A12"
}
