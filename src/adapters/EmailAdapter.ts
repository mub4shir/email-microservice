// adapters/EmailAdapter.ts
import { SendArgs } from "../types/email";

export interface EmailAdapter {
  send(args: SendArgs): Promise<string>;
}
