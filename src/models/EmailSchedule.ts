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
});

export const EmailSchedule = mongoose.model(
  "EmailSchedule",
  emailScheduleSchema
);
