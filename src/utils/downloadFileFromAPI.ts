// utils/downloadFileFromAPI.ts
import axios from "axios";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function downloadFileFromAPI(
  url: string
): Promise<{ filename: string; path: string; contentType: string }> {
  const response = await axios.get(url, { responseType: "stream" });

  const contentType =
    response.headers["content-type"] || "application/octet-stream";
  const ext = contentType.split("/")[1] || "bin";
  const filename = `report-${uuidv4()}.${ext}`;
  const outputPath = path.resolve(__dirname, "../temp", filename); // Save to temp dir

  await new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(outputPath);
    response.data.pipe(stream);
    stream.on("finish", resolve);
    stream.on("error", reject);
  });

  return {
    filename,
    path: outputPath,
    contentType,
  };
}
