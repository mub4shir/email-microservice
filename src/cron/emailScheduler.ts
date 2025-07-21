// cron/emailScheduler.ts
import cron from "node-cron";
import { EmailSchedule } from "../models/EmailSchedule";
import { dispatchEmail } from "../services/EmailDispatcher";
import { downloadFileFromAPI } from "../utils/downloadFileFromAPI";

export async function setupEmailSchedulers() {
  const clients = await EmailSchedule.find({ active: true });

  clients.forEach((client) => {
    const { email, sendTime, timezone = "UTC", _id } = client;

    const [hour, minute] = sendTime.split(":");
    const cronExp = `${minute} ${hour} * * *`;

    cron.schedule(
      cronExp,
      async () => {
        try {
          // STEP 1: Call your file API
          const fileUrl = `http://localhost:3000/api/report?client_id=${_id}`;
          const attachment = await downloadFileFromAPI(fileUrl);

          // STEP 2: Email template payload
          const payload = {
            user: { name: client.name },
          };

          // STEP 3: Send the email
          await dispatchEmail({
            template_key: "daily_report",
            vendor_ids: [client.email_vendor_id],
            payload,
            override: {
              to: [email],
              from: "support@yourdomain.com",
            },
            attachments: [attachment],
          });

          console.log(
            `Email sent to ${email} with attached file from ${fileUrl}`
          );
        } catch (err) {
          console.error(`Error sending email to ${email}:`, err);
        }
      },
      {
        timezone,
        scheduled: true,
      }
    );

    console.log(`⏰ Scheduled email to ${email} at ${sendTime} (${timezone})`);
  });
}
