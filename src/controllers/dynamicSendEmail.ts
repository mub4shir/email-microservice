// controllers/dynamicSendEmail.ts
import { Request, Response } from "express";
import { dispatchEmail } from "../services/EmailDispatcher";

export const dynamicSendEmail = async (req: Request, res: Response) => {
  try {
    const { template_key, vendor_ids, payload, override } = req.body;

    console.log(req.body);

    await dispatchEmail({ template_key, vendor_ids, payload, override });

    res.status(200).json({ message: "Emails dispatched" });
  } catch (err) {
    console.error("Dispatch Error:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
};
