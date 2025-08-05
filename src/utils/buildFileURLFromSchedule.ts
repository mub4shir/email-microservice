import { EmailSchedule } from "../models/EmailSchedule";

export function buildFileURLFromSchedule(
  schedule: typeof EmailSchedule.prototype
): string {
  const config = schedule.file_download;

  if (!config?.base_url || !config.query_params) {
    throw new Error("Missing file_download configuration in schedule.");
  }

  const params = { ...config.query_params };

  if (config.use_dynamic_dates) {
    const now = new Date().toUTCString();
    params.start_date = now;
    params.end_date = now;
  }

  const queryString = new URLSearchParams(params).toString();
  return `${config.base_url}?${queryString}`;
}
