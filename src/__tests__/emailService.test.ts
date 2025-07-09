import { EmailService } from "../services/emailService";

jest.mock("nodemailer");

describe("EmailService", () => {
  it("should send email successfully", async () => {
    const emailService = new EmailService();
    const sendMailSpy = jest.spyOn(emailService, "sendEmail");

    await emailService.sendEmail("test@example.com", "Test", "Hello");

    expect(sendMailSpy).toHaveBeenCalledWith(
      "test@example.com",
      "Test",
      "Hello"
    );
  });
});
