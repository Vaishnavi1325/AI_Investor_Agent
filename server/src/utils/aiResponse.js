export const getTextFromAiMessage = (aiMessage) => {
  if (!aiMessage) {
    return "";
  }

  if (typeof aiMessage.content === "string") {
    return aiMessage.content;
  }

  if (Array.isArray(aiMessage.content)) {
    return aiMessage.content
      .map((item) => item.text || "")
      .join("");
  }

  return JSON.stringify(aiMessage.content);
};