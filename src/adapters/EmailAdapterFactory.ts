// adapters/EmailAdapterFactory.ts
import { EmailAdapter } from "./EmailAdapter";
import { SESAdapter } from "./SESAdapter";
import { SMTPAdapter } from "./SMTPAdapter";

export function getEmailAdapter(vendor: string): EmailAdapter {
  console.log("in get email adapter", vendor);
  switch (vendor) {
    case "aws_ses":
      console.log("aws_sesaws_sesaws_sesaws_sesaws_sesaws_sesaws_ses");

      return new SESAdapter();
    case "gmail":
    case "outlook":
    case "smtp":
      return new SMTPAdapter();
    default:
      throw new Error(`Unsupported vendor: ${vendor}`);
  }
}
