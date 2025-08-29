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

// ✅ Signature block
const signatureBlock = `
  <p style="margin:24px 0 0 0;color:#444;font-size:14px;line-height:1.6;">
    If you have any questions or need help, reply to this email or contact us at 
    <a href="mailto:support@ticketnetwork.com" style="color:#0056B3;">support@ticketnetwork.com</a>.<br>
    Thank you for choosing <strong>TicketNetwork</strong>. We look forward to seeing you at the event!
  </p>
  <p style="margin:16px 0 0 0;color:#444;font-size:14px;line-height:1.6;">
    Best regards,<br>
    <strong>TicketNetwork Team</strong><br>
    🌐 <a href="https://www.ticketnetwork.com" style="color:#0056B3;">www.ticketnetwork.com</a><br>
    📧 <a href="mailto:support@ticketnetwork.com" style="color:#0056B3;">support@ticketnetwork.com</a>
  </p>
`;

function renderEmailShell(opts: {
  title: string;
  ribbonText: string;
  intro: string;
  ticket: TicketDetails;
  buttonLabel?: string;
  buttonHref?: string;
  logoUrl?: string;
  bannerUrl?: string;
}) {
  const {
    title,
    ribbonText,
    intro,
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
            <!-- Ribbon -->
            <tr>
              <td style="background-color:#EEF5FF;color:#1C3D88;font-weight:600;padding:12px 16px;border-bottom:1px solid #E6EEFC;font-family:Arial,Helvetica,sans-serif;font-size:14px;">
                ${esc(ribbonText)}
              </td>
            </tr>

            <!-- Logo -->
            <tr>
              <td align="center" style="padding:12px;background-color:#FFFFFF;">
                <img src="${esc(
                  logoUrl || defaultLogo
                )}" alt="Logo" width="140" style="display:block;border:0;outline:none;text-decoration:none;">
              </td>
            </tr>

            <!-- Banner -->
            <tr>
              <td style="line-height:0;">
                <img src="${esc(
                  bannerUrl || defaultBanner
                )}" alt="Event Banner" width="600" style="display:block;width:100%;border:0;outline:none;text-decoration:none;">
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td style="padding:16px 20px;font-family:Arial,Helvetica,sans-serif;color:#222222;">
                <h2 style="margin:0 0 8px 0;font-size:22px;font-weight:700;">${esc(
                  title
                )}</h2>
                
                <!-- Intro paragraph -->
                <p style="margin:0 0 16px 0;color:#444;font-size:14px;line-height:1.6;">
                  ${intro}
                </p>

                <!-- Details table -->
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                  <tr><td style="padding:8px 0;font-weight:bold;color:#555;width:150px;">Order ID:</td><td>${fmt(
                    ticket.orderId
                  )}</td></tr>
                  <tr><td style="padding:8px 0;font-weight:bold;color:#555;">Event:</td><td>${fmt(
                    ticket.eventName
                  )}</td></tr>
                  <tr><td style="padding:8px 0;font-weight:bold;color:#555;">Date:</td><td>${fmt(
                    ticket.date
                  )}</td></tr>
                  <tr><td style="padding:8px 0;font-weight:bold;color:#555;">Location:</td><td>${fmt(
                    ticket.location
                  )}</td></tr>
                  <tr><td style="padding:8px 0;font-weight:bold;color:#555;">Section:</td><td>${fmt(
                    ticket.section
                  )}</td></tr>
                  <tr><td style="padding:8px 0;font-weight:bold;color:#555;">Row:</td><td>${fmt(
                    ticket.row
                  )}</td></tr>
                  <tr><td style="padding:8px 0;font-weight:bold;color:#555;">Tickets:</td><td>${fmt(
                    ticket.quantity
                  )}</td></tr>
                  <tr><td style="padding:8px 0;font-weight:bold;color:#555;">Seats:</td><td>${fmt(
                    ticket.seat
                  )}</td></tr>
                  <tr><td style="padding:8px 0;font-weight:bold;color:#555;">Total:</td><td>${fmt(
                    ticket.total
                  )}</td></tr>
                </table>

                ${buttonBlock}

                <!-- Signature -->
                ${signatureBlock}
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="background-color:#F0F0F0;color:#777;font-size:12px;padding:15px;font-family:Arial,Helvetica,sans-serif;">
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
      title: "Please proceed with payment for your upcoming show",
      ribbonText: "",
      intro: `Hi <strong>${fmt(
        ticket.customerName,
        "Customer"
      )}</strong>,<br><br>
              Thank you for reserving your tickets for the upcoming <strong>${fmt(
                ticket.eventName,
                "Show"
              )}</strong> event.<br>
              To complete your purchase, please review your order details and click the link below to make your payment.`,
      ticket,
      buttonLabel: "Pay Now",
      buttonHref: paymentLink,
    }),

  ticket_confirmation: (ticket, paymentLink) =>
    renderEmailShell({
      title: "Your Ticket Confirmation",
      ribbonText: "",
      intro: `Hi <strong>${fmt(
        ticket.customerName,
        "Customer"
      )}</strong>,<br><br>
              Your booking for <strong>${fmt(
                ticket.eventName,
                "Show"
              )}</strong> is confirmed!<br>
              Please review your ticket details below.`,
      ticket,
      buttonLabel: paymentLink ? "View Order" : undefined,
      buttonHref: paymentLink,
    }),
};
