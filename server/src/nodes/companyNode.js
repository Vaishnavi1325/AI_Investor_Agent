import { chatModel } from "../llm/model.js";

const getTextFromAiMessage = (aiMessage) => {
  if (typeof aiMessage.content === "string") {
    return aiMessage.content;
  }

  return JSON.stringify(aiMessage.content);
};

export const companyNode = async (state) => {
  const prompt = `
You are a business analyst.

Provide a concise overview of ${state.company}.

Include:

- Industry
- Main Products or Services
- Market Position
- Major Competitors
- Recent Growth Highlights

Keep the response under 150 words.
`;

  const aiMessage = await chatModel.invoke(prompt);

  return {
    overview: getTextFromAiMessage(aiMessage),
  };
};