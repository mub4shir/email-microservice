// models/EmailSetting.ts
import mongoose from "mongoose";

const EmailSettingSchema = new mongoose.Schema(
  {
    vendor: { type: String, required: true }, // e.g., "gmail", "mailgun"
    from: { type: String, required: true },
    default_to: [{ type: String }],
    cc: [{ type: String }],
    bcc: [{ type: String }],
    smtp: {
      host: String,
      port: Number,
      secure: Boolean,
      auth: {
        user: String,
        pass: String, // Consider encryption
      },
    },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const EmailSetting = mongoose.model("EmailSetting", EmailSettingSchema);
