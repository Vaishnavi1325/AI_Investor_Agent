import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const currentDir = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(currentDir, "../../.env");

dotenv.config({ path: envPath });

export const env = Object.freeze({
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number.parseInt(process.env.PORT || "3000", 10),
  apiVersion: process.env.API_VERSION || "1.0.0",
  corsOrigin: process.env.CORS_ORIGIN || "*",
  requestBodyLimit: process.env.REQUEST_BODY_LIMIT || "10kb",
  groqApiKey: process.env.GROQ_API_KEY,
  groqModel: process.env.GROQ_MODEL || "llama-3.3-70b-versatile"
});
