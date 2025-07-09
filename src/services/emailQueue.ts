import Queue from "bull";
import { EmailService } from "./emailService";
import { container } from "tsyringe";

const emailQueue = new Queue("email", {
  redis: { host: "127.0.0.1", port: 6379 },
});

const emailService = container.resolve(EmailService);

emailQueue.process(async (job, done) => {
  const { to, subject, text, html } = job.data;
  await emailService.sendEmail(to, subject, text, html);
  done();
});

export const queueEmail = async (
  to: string,
  subject: string,
  text: string,
  html?: string
) => {
  await emailQueue.add({ to, subject, text, html });
};
