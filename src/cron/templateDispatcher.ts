import cron from "node-cron";
import fs from "fs";
import { TemplateDocument } from "../models/TemplateDocument";
import { downloadFileFromAPI } from "../utils/downloadFileFromAPI";
import { sendEmailWithCustomSMTP } from "../utils/sendEmailWithCustomSMTP";
import { getSMTPFromEnv, getFromEmailFromEnv } from "../utils/getSMTPFromEnv";
import { console } from "inspector";

const smtp = getSMTPFromEnv();
const from = getFromEmailFromEnv();

export async function setupTemplateDocumentSchedulers() {
  const templates = await TemplateDocument.find({ active: true });
  console.log(`🔍 Found ${templates.length} active template(s)`);
  templates.forEach((template) => {
    const [hour, minute] = template.send_time.split(":");
    console.log(
      `📬 Scheduling TemplateDocument ${template._id} at ${template.send_time}`
    );
    const cronExp = `${minute} ${hour} * * *`;

    const timezone = template.timezone || "Asia/Kolkata"; // ✅ fallback to IST

    cron.schedule(
      cronExp,
      async () => {
        try {
          console.log(
            `⏰ Running job for org ${template.organization_uuid} - campaign ${template.campaign_id}`
          );

          const attachment = await downloadFileFromAPI(template.file_url);

          for (const recipient of template.recipients) {
            const subject = replacePlaceholders(recipient, template.subject);
            const html = replacePlaceholders(recipient, template.body_html);
            const text = replacePlaceholders(recipient, template.body_text);

            await sendEmailWithCustomSMTP({
              to: recipient.email,
              from,
              subject,
              html,
              text,
              smtp,
              attachments: [attachment],
            });

            console.log(`✅ Email sent to ${recipient.email}`);
          }

          // Cleanup
          fs.unlink(attachment.path, (err) => {
            if (err) {
              console.warn(`⚠️ Could not delete file ${attachment.path}`);
            } else {
              console.log(`🧹 Deleted temp file: ${attachment.path}`);
            }
          });
        } catch (err) {
          console.error(`❌ Error processing template ${template._id}`, err);
        }
      },
      {
        timezone, // 🕰️ always runs in IST or template-defined TZ
      }
    );

    console.log(
      `📬 Scheduled TemplateDocument ${template._id} at ${template.send_time} (${timezone})`
    );
  });
}

// Utility to inject recipient placeholders
function replacePlaceholders(
  recipient: { name: string },
  str?: string | null
): string {
  return (str || "").replace(/{{\s*name\s*}}/g, recipient.name);
}
