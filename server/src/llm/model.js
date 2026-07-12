import { ChatGroq } from "@langchain/groq";
import { env } from "../config/env.js";

export const chatModel = new ChatGroq({
  apiKey: env.groqApiKey,
  model: env.groqModel,
  temperature: 0.2
});
