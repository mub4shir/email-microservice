import mongoose from "mongoose";
import { TemplateDocument } from "../models/TemplateDocument";
import { sendTemplateDocument } from "../utils/sendTemplateLogic";

async function run() {
  try {
    await mongoose.connect("mongodb://localhost:27017/email_service");
    console.log("✅ Connected to MongoDB");

    const docId = "689080a909e8d4003d5efb2c";
    const doc = await TemplateDocument.findById(docId);
    if (!doc) throw new Error(`❌ No TemplateDocument found with ID ${docId}`);

    const smtp = {
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "mubashir.ali@radicalminds.co",
        pass: "gidn blkb raix uzfm", // App password
      },
    };

    const from = "mubashir.ali@radicalminds.co";

    await sendTemplateDocument(doc, smtp, from);
    console.log("✅ Email sent successfully");

    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
