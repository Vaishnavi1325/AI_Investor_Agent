import { env } from "../config/env.js";
import { chatModel } from "../llm/model.js";
import { AppError } from "../errors/AppError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

const getTextFromAiMessage = (aiMessage) => {
  if (typeof aiMessage.content === "string") {
    return aiMessage.content;
  }

  return JSON.stringify(aiMessage.content);
};

export const sendMessageToAi = async ({ message }) => {
  if (!env.groqApiKey) {
    throw new AppError("GROQ_API_KEY is missing from .env", HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }

  try {
    const aiMessage = await chatModel.invoke(message);

    return {
      message,
      response: getTextFromAiMessage(aiMessage)
    };
  } catch (_error) {
    throw new AppError("AI test request failed", HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};
