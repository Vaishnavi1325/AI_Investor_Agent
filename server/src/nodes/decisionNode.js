import { chatModel } from "../llm/model.js";

export const decisionNode = async (state) => {
  const prompt = `
You are a professional investment analyst.

Based ONLY on the information below, provide a final investment recommendation.

Company:
${state.company}

Company Overview:
${state.overview}

Financial Summary:
${state.financials}

Recent News:
${state.news}

Investment Risks:
${state.risks}

Return ONLY valid JSON.

{
  "recommendation": "Invest" or "Pass",
  "confidence": 85,
  "pros": [
    "...",
    "...",
    "..."
  ],
  "cons": [
    "...",
    "..."
  ],
  "summary": "A concise final recommendation."
}

Rules:
- Return ONLY JSON.
- Do NOT use markdown.
- Do NOT use \`\`\`.
- Confidence must be an integer from 0 to 100.
`;

  const aiMessage = await chatModel.invoke(prompt);

  let text =
    typeof aiMessage.content === "string"
      ? aiMessage.content
      : JSON.stringify(aiMessage.content);

  text = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    return {
      decision: JSON.parse(text),
    };
  } catch (err) {
    console.error("Decision JSON Parse Error:", err);

    return {
      decision: {
        recommendation: "Unknown",
        confidence: 0,
        pros: [],
        cons: [],
        summary: text,
      },
    };
  }
};