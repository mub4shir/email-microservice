export type EmailTemplateId = "payment_request" | "ticket_confirmation";

export interface TicketDetails {
  eventName?: string;
  date?: string;
  location?: string;

  customerName?: string; // ?name → template shows "Customer" if missing
  quantity?: number | string; // ?count
  orderId?: string; // ?orderId or constant

  // extra fields now rendered in the template
  section?: string | null; // e.g. "Lower level"
  row?: string | number | null; // e.g. "Row 19, RD-27, 28"
  total?: number | string; // e.g. "2 x $150 + $10 = $310"
  seat?: string | null; // e.g. "Seated together"
}
