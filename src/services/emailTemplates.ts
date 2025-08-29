import { TicketDetails } from "../types/Ticket";

export const emailTemplates: Record<
  string,
  (ticket: TicketDetails, paymentLink: string) => string
> = {
  payment_request: (ticket: TicketDetails, paymentLink: string) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Ticket Payment</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
        background-color: #f5f6fa;
        color: #333;
      }
      table {
        border-spacing: 0;
      }
      img {
        display: block;
        max-width: 100%;
        height: auto;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      }
      .logo {
        padding: 10px;
        text-align: center;
        background-color: #ffffff;
        display: flex;
        justify-content: center;
      }
      .banner {
        width: 100%;
      }
      .content {
        padding: 30px 20px;
      }
      .content h2 {
        margin-top: 0;
        font-size: 22px;
        color: #222;
      }
      .details-table {
        width: 100%;
        margin-top: 20px;
      }
      .details-table td {
        padding: 10px 0;
        vertical-align: top;
      }
      .details-table td:first-child {
        font-weight: bold;
        width: 130px;
        color: #555;
      }
      .button-container {
        margin-top: 30px;
        text-align: center;
      }
      .pay-button {
        display: inline-block;
        padding: 14px 24px;
        background-color: #0056b3;
        color: #ffffff !important;
        text-decoration: none;
        border-radius: 4px;
        font-weight: bold;
        font-size: 16px;
      }
      .footer {
        background-color: #f0f0f0;
        color: #777;
        font-size: 12px;
        text-align: center;
        padding: 15px;
      }

      @media screen and (max-width: 480px) {
        .content {
          padding: 20px 15px;
        }
        .pay-button {
          font-size: 14px;
          padding: 12px 20px;
        }
        .details-table td:first-child {
          width: 100px;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <!-- Client Logo -->
      <div class="logo">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQY3Fdmiw8xUoj8W5S6SLBwEfJDX_mnaNGXg&s"
          alt="Client Logo"
        />
      </div>

      <!-- Event Banner -->
      <img
        class="banner"
        src="https://www.uber-arena.de/assets/img/Adele_WS_960x363px_01_02.jpg"
        alt="Event Banner"
      />

      <!-- Content -->
      <div class="content">
        <h2>Complete Your Payment</h2>
        <p>
          Thank you for reserving your tickets! Please find your order details
          below:
        </p>

        <table class="details-table">
          <tr><td>Event:</td><td>${ticket.eventName}</td></tr>
          <tr><td>Date:</td><td>${ticket.date}</td></tr>
          <tr><td>Location:</td><td>${ticket.location}</td></tr>
          <tr><td>Section:</td><td>${ticket.section ?? "N/A"}</td></tr>
          <tr><td>Row:</td><td>${ticket.row ?? "N/A"}</td></tr>
          <tr><td>Tickets:</td><td>${ticket.quantity ?? "1"}</td></tr>
          <tr><td>Total:</td><td>${ticket.total ?? "TBD"}</td></tr>
        </table>

        <div class="button-container">
          <a href="${paymentLink}" class="pay-button">Pay Now</a>
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">© 2025 TicketNetwork. All rights reserved.</div>
    </div>
  </body>
</html>
`,
};
