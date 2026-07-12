import { chatModel } from "../llm/model.js";

const getTextFromAiMessage = (aiMessage) => {
  if (typeof aiMessage.content === "string") {
    return aiMessage.content;
  }

  return JSON.stringify(aiMessage.content);
};

export const riskNode = async (state) => {
  const prompt = `
You are a financial analyst.

Based on the following information, identify the major investment risks.

Company: ${state.company}

Overview:
${state.overview}

Financial Summary:
${state.financials}

News Summary:
${state.news}

List the top 3 to 5 investment risks in bullet points.
`;

  const aiMessage = await chatModel.invoke(prompt);

  return {
    risks: getTextFromAiMessage(aiMessage),
  };
};