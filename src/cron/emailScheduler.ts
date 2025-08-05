// import cron from "node-cron";
// import { EmailSchedule } from "../models/EmailSchedule";
// import { dispatchEmail } from "../services/EmailDispatcher";
// import { downloadFileFromAPI } from "../utils/downloadFileFromAPI";
// import { buildFileURLFromSchedule } from "../utils/buildFileURLFromSchedule";
// import fs from "fs";

// export async function setupEmailSchedulers() {
//   const clients = await EmailSchedule.find({ active: true });

//   clients.forEach((client) => {
//     const { email, sendTime, timezone = "UTC" } = client;

//     const [hour, minute] = sendTime.split(":");
//     const cronExp = `${minute} ${hour} * * *`;

//     cron.schedule(
//       cronExp,
//       async () => {
//         try {
//           const fileUrl = buildFileURLFromSchedule(client);

//           const attachment = await downloadFileFromAPI(fileUrl);

//           const payload = {
//             user: { name: client.name },
//           };

//           await dispatchEmail({
//             template_key: client.template_key,
//             vendor_ids: [client.email_vendor_id],
//             payload,
//             override: {
//               to: [email],
//               from: "support@yourdomain.com",
//             },
//             attachments: [attachment],
//           });

//           console.log(`✅ Email sent to ${email} with file from: ${fileUrl}`);

//           // cleanup
//           fs.unlink(attachment.path, (err) => {
//             if (err)
//               console.warn(`⚠️ Could not delete file ${attachment.path}`);
//           });
//         } catch (err) {
//           console.error(`❌ Error sending email to ${email}:`, err);
//         }
//       },
//       {
//         timezone,
//         scheduled: true,
//       }
//     );

//     console.log(`⏰ Scheduled email to ${email} at ${sendTime} (${timezone})`);
//   });
// }
