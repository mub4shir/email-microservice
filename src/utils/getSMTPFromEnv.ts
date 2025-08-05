export function getSMTPFromEnv() {
  return {
    host: process.env.SMTP_HOST!,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
  };
}

export function getFromEmailFromEnv() {
  return process.env.SMTP_FROM!;
}
