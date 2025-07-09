// models/EmailTemplate.ts
import mongoose from "mongoose";

const EmailTemplateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    template_key: { type: String, required: true, unique: true }, // used in API
    subject: { type: String, required: true },
    body_html: { type: String },
    body_text: { type: String },
    placeholders: [{ type: String }],
    tags: [{ type: String }],
    vendor_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: "EmailSetting" }],
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const EmailTemplate = mongoose.model(
  "EmailTemplate",
  EmailTemplateSchema
);
