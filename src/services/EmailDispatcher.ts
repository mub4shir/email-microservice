// services/EmailDispatcher.ts
import { renderTemplate } from "../utils/renderTemplate";
import { EmailSetting } from "../models/EmailSetting";
import { EmailTemplate } from "../models/EmailTemplate";
import { getEmailAdapter } from "../adapters/EmailAdapterFactory";

export async function dispatchEmail({
  template_key,
  vendor_ids,
  payload,
  override,
}: {
  template_key: string;
  vendor_ids: string[];
  payload: Record<string, any>;
  override?: {
    to?: string[];
    cc?: string[];
    bcc?: string[];
    from?: string;
  };
}): Promise<void> {
  const template = await EmailTemplate.findOne({ template_key, active: true });

  console.log("templatetemplatetemplatetemplatetemplate", template);

  if (!template) throw new Error("Template not found");

  for (const vendorId of vendor_ids) {
    const config = await EmailSetting.findById(vendorId);
    if (!config || !config.active) continue;

    const from = override?.from || config.from;
    const to = override?.to || config.default_to || [];
    const cc = override?.cc || config.cc || [];
    const bcc = override?.bcc || config.bcc || [];

    const subject = renderTemplate(template.subject, payload);
    const html = template.body_html
      ? renderTemplate(template.body_html, payload)
      : undefined;
    const text = template.body_text
      ? renderTemplate(template.body_text, payload)
      : undefined;

    console.log(
      "config.vendorconfig.vendorconfig.vendorconfig.vendorconfig.vendor",
      config.vendor
    );
    const adapter = getEmailAdapter(config.vendor);

    console.log("adapteradapteradapteradapter", adapter);
    const messageId = await adapter.send({
      from,
      to,
      cc,
      bcc,
      subject,
      html,
      text,
      config,
    });

    console.log(
      "messageImessageIdmessageIdmessageIdmessageIdmessageId",
      messageId
    );

    console.log(`Email sent with vendor ${config.vendor}: ${messageId}`);
  }
}
