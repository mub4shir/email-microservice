// utils/sendTemplateLogic.ts

import fs from "fs";
import { TemplateDocument } from "../models/TemplateDocument";
import { downloadFileFromAPI } from "./downloadFileFromAPI";
import { sendEmailWithCustomSMTP } from "./sendEmailWithCustomSMTP";

export async function sendTemplateDocument(
  template: InstanceType<typeof TemplateDocument>,
  smtp: {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
  },
  from: string
) {
  let attachment: {
    filename: string;
    path: string;
    contentType: string;
  } | null = null;

  try {
    console.log(`📤 Sending TemplateDocument ${template._id}...`);

    attachment = await downloadFileFromAPI(template.file_url);

    for (const recipient of template.recipients) {
      const subject = (template.subject ?? "").replace(
        /{{\s*name\s*}}/g,
        recipient.name
      );
      const html = (template.body_html ?? "").replace(
        /{{\s*name\s*}}/g,
        recipient.name
      );
      const text = (template.body_text ?? "").replace(
        /{{\s*name\s*}}/g,
        recipient.name
      );

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
  } catch (err) {
    console.error(`❌ Failed to send template ${template._id}`, err);
    throw err;
  } finally {
    if (attachment) {
      fs.unlink(attachment.path, (err) => {
        if (err) {
          console.warn(
            `⚠️ Failed to delete temp file ${attachment?.path}:`,
            err.message
          );
        } else {
          console.log(`🧹 Deleted temp file: ${attachment?.path}`);
        }
      });
    }
  }
}
