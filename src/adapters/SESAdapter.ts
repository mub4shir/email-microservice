import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { EmailAdapter } from "./EmailAdapter";
import { SendArgs } from "../types/email";

export class SESAdapter implements EmailAdapter {
  async send({ from, to, cc, bcc, subject, html, text, config }: SendArgs) {
    const sesClient = new SESClient({
      region: config.region,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    });

    const command = new SendEmailCommand({
      Source: from,
      Destination: {
        ToAddresses: to,
        CcAddresses: cc,
        BccAddresses: bcc,
      },
      Message: {
        Subject: { Data: subject },
        Body: {
          Html: html ? { Data: html } : undefined,
          Text: text ? { Data: text } : undefined,
        },
      },
    });

    const response = await sesClient.send(command);
    console.log(
      "responseresponseresponseresponseresponseresponseresponse",
      response
    );
    return response.MessageId!;
  }
}
