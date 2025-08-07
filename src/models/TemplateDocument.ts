// models/TemplateDocument.ts
import mongoose from "mongoose";

const TemplateDocumentSchema = new mongoose.Schema(
  {
    organization_uuid: { type: String, required: true },
    campaign_id: { type: String, required: true },
    name: { type: String, required: true },
    recipients: [
      {
        name: { type: String, required: true, default: "" },
        email: { type: String, required: true },
      },
    ],

    subject: { type: String, required: true },
    body_html: { type: String },
    body_text: { type: String },
    placeholders: [{ type: String }], // e.g. ["{{name}}"]

    file_url: {
      type: String,
      required: true,
    },

    send_time: {
      type: String, // e.g. "09:00"
      required: true,
    },
    timezone: {
      type: String,
      default: "UTC",
    },

    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const TemplateDocument = mongoose.model(
  "TemplateDocument",
  TemplateDocumentSchema
);
export type TemplateDocumentType = mongoose.Document & {
  organization_uuid: string;
  campaign_id: string;
  recipients: { name: string; email: string }[];
  subject: string;
  body_html?: string;
  body_text?: string;
  file_url: string;
  send_time: string;
  timezone?: string;
  active: boolean;
};
