// src/services/emailTemplates.ts
import { TicketDetails } from "../types/Ticket";

const esc = (v?: string | number | null) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const fmt = (v?: string | number | null, fallback = "—") =>
  v === undefined || v === null || String(v).trim() === "" ? fallback : esc(v);

const defaultLogo =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQY3Fdmiw8xUoj8W5S6SLBwEfJDX_mnaNGXg&s";
const defaultBanner =
  "https://www.uber-arena.de/assets/img/Adele_WS_960x363px_01_02.jpg";

function renderEmailShell(opts: {
  title: string;
  ribbonText: string;
  ticket: TicketDetails;
  buttonLabel?: string;
  buttonHref?: string;
  logoUrl?: string;
  bannerUrl?: string;
}) {
  const {
    title,
    ribbonText,
    ticket,
    buttonLabel,
    buttonHref,
    logoUrl,
    bannerUrl,
  } = opts;

  const buttonBlock = buttonLabel
    ? buttonHref && String(buttonHref).trim() !== ""
      ? `<table width="100%" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td align="center" style="padding-top:24px;">
                <a href="${esc(buttonHref)}"
                   style="display:inline-block;padding:14px 24px;background-color:#0056B3;color:#FFFFFF;text-decoration:none;border-radius:4px;font-weight:bold;font-size:16px;">
                  ${esc(buttonLabel)}
                </a>
              </td>
            </tr>
           </table>`
      : `<table width="100%" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td align="center" style="padding-top:24px;color:#666666;font-size:13px;">
                Payment link will be sent shortly.
              </td>
            </tr>
           </table>`
    : "";

  return `
<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;padding:0;background-color:#F5F6FA;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#F5F6FA;">
      <tr>
        <td align="center" style="padding:20px;">
          <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="width:600px;max-width:600px;background-color:#FFFFFF;border-radius:8px;overflow:hidden;border:1px solid #E6E9F0;">
            <tr>
              <td style="background-color:#EEF5FF;color:#1C3D88;font-weight:600;padding:12px 16px;border-bottom:1px solid #E6EEFC;font-family:Arial,Helvetica,sans-serif;font-size:14px;">
                ${esc(ribbonText)}
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:12px;background-color:#FFFFFF;">
                <img src="${esc(
                  logoUrl || defaultLogo
                )}" alt="Logo" width="140" style="display:block;border:0;outline:none;text-decoration:none;">
              </td>
            </tr>
            <tr>
              <td style="line-height:0;">
                <img src="${esc(
                  bannerUrl || defaultBanner
                )}" alt="Event Banner" width="600" style="display:block;width:100%;border:0;outline:none;text-decoration:none;">
              </td>
            </tr>
            <tr>
              <td style="padding:24px 20px;font-family:Arial,Helvetica,sans-serif;color:#222222;">
                <h2 style="margin:0 0 8px 0;font-size:22px;font-weight:700;">${esc(
                  title
                )}</h2>
                <p style="margin:0 0 16px 0;color:#666666;font-size:14px;line-height:1.5;">
                  Hello <strong>${fmt(
                    ticket.customerName,
                    "Customer"
                  )}</strong>, please review your order details below.
                </p>
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                  <tr>
                    <td style="padding:8px 0;color:#555555;font-weight:bold;width:150px;font-size:14px;">Order ID:</td>
                    <td style="padding:8px 0;font-size:14px;color:#333333;">${fmt(
                      ticket.orderId
                    )}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#555555;font-weight:bold;width:150px;font-size:14px;">Event:</td>
                    <td style="padding:8px 0;font-size:14px;color:#333333;">${fmt(
                      ticket.eventName
                    )}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#555555;font-weight:bold;width:150px;font-size:14px;">Date:</td>
                    <td style="padding:8px 0;font-size:14px;color:#333333;">${fmt(
                      ticket.date
                    )}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#555555;font-weight:bold;width:150px;font-size:14px;">Location:</td>
                    <td style="padding:8px 0;font-size:14px;color:#333333;">${fmt(
                      ticket.location
                    )}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#555555;font-weight:bold;width:150px;font-size:14px;">Tickets:</td>
                    <td style="padding:8px 0;font-size:14px;color:#333333;">${fmt(
                      ticket.quantity
                    )}</td>
                  </tr>
                </table>
                ${buttonBlock}
              </td>
            </tr>
            <tr>
              <td align="center" style="background-color:#F0F0F0;color:#777777;font-size:12px;padding:15px;font-family:Arial,Helvetica,sans-serif;">
                © ${new Date().getFullYear()} TicketNetwork. All rights reserved.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
}

export const emailTemplates: Record<
  string,
  (ticket: TicketDetails, paymentLink?: string) => string
> = {
  payment_request: (ticket, paymentLink) =>
    renderEmailShell({
      title: "Complete Your Payment",
      ribbonText: "Payment Pending",
      ticket,
      buttonLabel: "Pay Now",
      buttonHref: paymentLink,
    }),
  ticket_confirmation: (ticket, paymentLink) =>
    renderEmailShell({
      title: "🎟 Your Ticket Confirmation",
      ribbonText: "Booking Confirmed",
      ticket,
      buttonLabel: paymentLink ? "View Order" : undefined,
      buttonHref: paymentLink,
    }),
};
