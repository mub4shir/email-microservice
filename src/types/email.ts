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
}
