// types/email.ts
export interface SendArgs {
  from: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  html?: string;
  text?: string;
  config: any;
  attachments?: {
    filename: string;
    path: string; // or content: Buffer for dynamic attachments
    contentType?: string;
  }[];
}
