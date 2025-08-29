import { TicketDetails } from "../types/Ticket";

export const emailTemplates: Record<
  string,
  (ticket: TicketDetails, paymentLink: string) => string
> = {
  payment_request: (ticket: TicketDetails, paymentLink: string) => `
<!DOCTYPE html>
<html lang="en">
  <head> … </head>
  <body>
    <div class="container">
      <div class="logo">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQY3Fdmiw8xUoj8W5S6SLBwEfJDX_mnaNGXg&s"
          alt="Client Logo"
        />
      </div>
      <img
        class="banner"
        src="https://www.uber-arena.de/assets/img/Adele_WS_960x363px_01_02.jpg"
        alt="Event Banner"
      />
      <div class="content">
        <h2>Complete Your Payment</h2>
        <p>
          Hello <strong>${
            (ticket as any).customerName ?? "Customer"
          }</strong>,<br/>
          Thank you for reserving your tickets! Please find your order details below:
        </p>
        <table class="details-table">
          <tr><td>Order ID:</td><td>${(ticket as any).id ?? "N/A"}</td></tr>
          <tr><td>Event:</td><td>${ticket.eventName}</td></tr>
          <tr><td>Date:</td><td>${ticket.date}</td></tr>
          <tr><td>Location:</td><td>${ticket.location}</td></tr>
          <tr><td>Section:</td><td>${ticket.section ?? "N/A"}</td></tr>
          <tr><td>Row:</td><td>${ticket.row ?? "N/A"}</td></tr>
          <tr><td>Tickets:</td><td>${
            (ticket as any).ticketCount ?? ticket.quantity ?? "1"
          }</td></tr>
          <tr><td>Total:</td><td>${ticket.total ?? "TBD"}</td></tr>
        </table>
        <div class="button-container">
          <a href="${paymentLink}" class="pay-button">Pay Now</a>
        </div>
      </div>
      <div class="footer">© 2025 TicketNetwork. All rights reserved.</div>
    </div>
  </body>
</html>
`,
};
