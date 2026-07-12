import axios from "axios";
import { chatModel } from "../llm/model.js";
import { getTicker } from "../utils/companyTicker.js";
import { getTextFromAiMessage } from "../utils/aiResponse.js";

export const financeNode = async (state) => {
  const ticker = getTicker(state.company);

  const [profileResponse, metricsResponse] = await Promise.all([
    axios.get("https://finnhub.io/api/v1/stock/profile2", {
      params: {
        symbol: ticker,
        token: process.env.FINNHUB_API_KEY,
      },
    }),
    axios.get("https://finnhub.io/api/v1/stock/metric", {
      params: {
        symbol: ticker,
        metric: "all",
        token: process.env.FINNHUB_API_KEY,
      },
    }),
  ]);

  const profile = profileResponse.data;
  const metrics = metricsResponse.data.metric;

  const prompt = `
You are a financial analyst.

Analyze the following information.

Company: ${profile.name}

Industry: ${profile.finnhubIndustry}

Market Capitalization: ${profile.marketCapitalization}

PE Ratio: ${metrics.peBasicExclExtraTTM}

EPS: ${metrics.epsBasicExclExtraItemsTTM}

52 Week High: ${metrics["52WeekHigh"]}

52 Week Low: ${metrics["52WeekLow"]}

Return:

- Financial Health
- Strengths
- Concerns

Keep it under 120 words.
`;

  const aiMessage = await chatModel.invoke(prompt);

  return {
    financials: getTextFromAiMessage(aiMessage),
  };
};