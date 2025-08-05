// models/EmailSchedule.ts
import mongoose from "mongoose";

const emailScheduleSchema = new mongoose.Schema({
  name: String,
  email: String,
  sendTime: String, // "HH:mm"
  timezone: String, // e.g. "Asia/Kolkata"
  email_vendor_id: mongoose.Schema.Types.ObjectId,
  template_key: String,
  active: { type: Boolean, default: true },

  // ⬇️ New field
  file_download: {
    base_url: String,
    query_params: mongoose.Schema.Types.Mixed, // or: Map<String, String>
    use_dynamic_dates: { type: Boolean, default: false },
    file_name_prefix: String, // e.g., "sos-daily"
  },
});

export const EmailSchedule = mongoose.model(
  "EmailSchedule",
  emailScheduleSchema
);
